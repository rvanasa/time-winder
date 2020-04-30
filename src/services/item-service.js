import Papa from 'papaparse';
import seedrandom from 'seedrandom';
import {findAllDialogs} from './dialog-service';
import {GiSkullMask} from 'react-icons/all';

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function groupBy(xs, keyFn) {
    return xs.reduce((r, x) => {
        let key = keyFn(x);
        (r[key] = r[key] || []).push(x);
        return r;
    }, {});
}

function randomChance(rng, chance) {
    return rng.double() <= chance;
}

function randomElement(rng, array) {
    if(!array.length) {
        throw new Error('Empty array');
    }
    return array[Math.abs(rng.int32()) % array.length];
}

function randomInsert(rng, array, ...elements) {
    array.splice(Math.abs(rng.int32()) % (array.length + 1), 0, ...elements);
}

function randomDate(rng, start, end) {
    let dateString = new Date(+start + rng.double() * (+end - start)).toDateString();
    return new Date(dateString);
}

async function getCSV(url) {
    return new Promise(((resolve, reject) => {
        return Papa.parse(url, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete(result) {
                resolve(result.data);
            },
        });
    }));
}

let rngPeople = seedrandom('people');

let peopleListsPromise = Promise.all([
    getCSV(process.env.PUBLIC_URL + '/data/singers.csv')
        .then(async rows => {
            let suspiciousDialogs = await findAllDialogs('suspicious');
            let friendlyDialogs = await findAllDialogs('friendly');
            let sedatedDialogs = await findAllDialogs('sedated');
            return rows.map((row, i) => {
                let person = {
                    type: 'person',
                    // id: 'singer' + i,
                    title: row.singer,
                    message: `"${randomElement(rngPeople, suspiciousDialogs)}"`,
                    date: new Date(row.year, row.month - 1, row.day),
                    emote: 'suspicious',
                    consumeVerb: 'Sedated',
                    preventSelfDrag() {
                        if(this.hasConsumed) {
                            return false;
                        }
                        return (this.ctx.name === 'today' && this.emote === 'suspicious')
                            || this.ctx.inventories[this.ctx.name === 'today' ? 'backpack' : 'today']
                                .some(item => item.willConsume && item.willConsume(this));
                    },
                    willConsume(item) {
                        return !this.hasConsumed && item.type === 'juice';
                    },
                    onConsume(item) {
                        this.message = `"${randomElement(seedrandom(this.id), sedatedDialogs)}"`;
                        this.hasConsumed.length = 0;
                    },
                    onView() {
                        if(this.emote === 'suspicious') {
                            if(this.ctx.items.some(item => item.type === 'dino' || (['event', 'music'].includes(item.type) && +item.date > +this.date))) {
                                this.convertFriendly();
                            }
                        }
                    },
                    convertFriendly() {
                        this.emote = 'friendly';
                        this.message = `"${randomElement(seedrandom(this.id), friendlyDialogs)}"`;
                    }
                };
                if(randomChance(rngPeople, .4)) {
                    person.convertFriendly();
                }
                return person;
            });
        }),
]);

const yearGroupsPromise = Promise.all([
    // getCSV('data/books.csv')
    //     .then(rows => rows.map((row, i) => {
    //         return {
    //             type: 'book',
    //             id: 'book' + i,
    //             title: row.title,
    //             message: row.authors,
    //             date: new Date(row.year, row.month - 1, row.day),
    //             emote: 'book',
    //         };
    //     })),
    getCSV(process.env.PUBLIC_URL + '/data/headlines.csv')
        .then(rows => rows.map((row, i) => {
            return {
                type: 'event',
                // id: 'event' + i,
                title: row.title,
                date: new Date(row.year, row.month - 1, row.day),
                noSkeleton: true,
            };
        })),
    getCSV(process.env.PUBLIC_URL + '/data/songs.csv')
        .then(rows => rows.map((row, i) => {
            return {
                type: 'music',
                // id: 'music' + i,
                title: row.song,
                message: row.singer,
                date: new Date(row.year, row.month - 1, row.day),
                emote: 'music',
                noSkeleton: true,
            };
        })),
])
    .then(parts => parts.flat())
    .then(items => groupBy(items, item => item.date.getFullYear()));

const dinosaursPromise = getCSV(process.env.PUBLIC_URL + '/data/dinosaurs.csv')
    .then(dinos => dinos.map((row, i) => {
        let omnivore = row.diet.toLowerCase().includes('omni');
        let carnivore = row.diet.toLowerCase().includes('carni');
        // let herbivore = row.diet.toLowerCase().includes('herbi');
        let herbivore = !omnivore && !carnivore;
        return {
            type: 'dino',
            // id: 'dino' + i,
            title: row.name,
            message: row.diet.toUpperCase().replace('?', ''),
            date: row.period.toUpperCase(),
            emote: carnivore ? 'angry' : 'neutral',
            preventDrag() {
                if(carnivore) {
                    return !this.hasConsumed || this.hasConsumed.length < 3;
                }
                return this.ctx.name === 'today' && !this.hasConsumed;
            },
            willConsume({type}) {
                return [
                    ...(carnivore || omnivore ? ['dino', 'person'] : []),
                    ...(herbivore || omnivore ? ['food'] : [])]
                    .includes(type);
            },
            onConsume(item) {
                if(!item.noSkeleton) {
                    // setTimeout(() => {
                    let skeleton = {
                        // id: item.id + 'skeleton',
                        type: 'skeleton',
                        aliveType: item.type,
                        title: item.title,
                        message: 'Skeleton',
                        icon: item.skeletonIcon,
                    };
                    let items = [...this.ctx.inventories[this.ctx.name]];
                    items.splice(items.indexOf(this) + 1, 0, skeleton);
                    this.ctx.applyInventory(this.ctx.name, items);
                    // });
                }
            }
        };
    }));

const foods = ['Potato', 'Rice', 'Tofu', 'Corn', 'Carrot', 'Beans', 'Soylent', 'Lard', 'Quinoa'].map(name => ({
    type: 'food',
    title: name,
    emote: 'food',
    noSkeleton: true,
}));

const juices = ['Orange', 'Apple', 'Lemon', 'Lime', 'Kiwi', 'Grape'].map(name => ({
    type: 'juice',
    title: name + ' Juice',
    emote: 'juice',
    noSkeleton: true,
}));

export async function findItemsByDate(date) {
    let group = (await yearGroupsPromise)[date.getFullYear()];
    if(!group) {
        return [];
    }
    let dateString = date.toDateString();
    let items = group.filter(item => item.date.toDateString() === dateString);

    if(items.length) {
        let rng = seedrandom(dateString);

        if(+date === +new Date(2015, 10 - 1, 21)) {
            randomInsert(rng, items, {
                type: 'person',
                title: 'Doc Brown',
                date,
                message: '"Great Scott!"',
                emote: 'friendly',
            }, {
                type: 'person',
                title: 'Marty McFly',
                date,
                message: '"This is heavy."',
                emote: 'friendly',
            });
        }
        else if(date.getDate() === 1) {
            items.length = 0;
            items.unshift(await randomTimeWitch(rng, date));
        }
        else if(randomChance(rng, .3)) {
            randomInsert(rng, items, await randomPerson(rng, date));
        }
        else if(randomChance(rng, .3)) {
            randomInsert(rng, items, await randomFood(rng, date));
        }
        else if(randomChance(rng, .3)) {
            randomInsert(rng, items, await randomDino(rng, date));
        }
    }
    return items;
}

async function randomDino(rng, date) {
    return randomElement(rng, await dinosaursPromise);
}

async function randomPerson(rng, date) {
    let people = randomElement(rng, await peopleListsPromise).filter(person => +person.date >= date);
    let person;
    if(people.length/* && randomChance(rng, .8)*/) {
        person = randomElement(rng, people);
    }
    else {
        person = {
            type: 'person',
            title: 'Gustav',
            emote: 'friendly',
        };
    }
    return {
        ...person,
        date,
    };
}

async function randomFood(rng, date) {
    return randomChance(rng, .7)
        ? {...randomElement(rng, foods)}
        : {...randomElement(rng, juices)};
}

async function randomTimeWitch(rng, date) {
    // https://coursesweb.net/javascript/zodiac-signs_cs
    function getZodiac(date) {
        let [month, day] = [date.getMonth() + 1, date.getDate()];
        let zodiac = ['', 'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
        let last_day = ['', 19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
        return (day > last_day[month]) ? zodiac[month + 1] : zodiac[month];
    }

    let rngCurse = seedrandom();
    return {
        type: 'person',
        title: getZodiac(date) + ' Time Witch',
        // message: randomElement(rng, await findAllDialogs('curse')),
        emote: 'witch',
        skeletonIcon: GiSkullMask,
        preventDrag() {
            return this.ctx.name !== 'backpack';
        },
        update(delta) {
            this.attackTimer += delta;
            if(this.attackTimer > 1.2) {
                randomCurse(rngCurse, date).then(item => {
                    this.ctx.applyInventory('backpack', [item, ...this.ctx.inventories.backpack]);
                });
                this.attackCt++;
                if(this.attackCt > 3) {
                    this.attackCt = 0;
                    this.attackTimer = 0;
                }
            }
        },
        attackTimer: 0,
        attackCt: 0,
    };
}

async function randomCurse(rng, date) {
    let liftDate = randomDate(rng, new Date(2003, 1, 1), new Date(2020, 1, 1));
    if(liftDate.getDate() === 1) {
        liftDate.setDate(2);
    }
    return {
        type: 'curse',
        title: randomElement(rng, await findAllDialogs('curse')),
        date: liftDate,
        emote: 'cursed',
        consumeVerb: 'Amended',
        preventSelfDrag() {
            return this.emote === 'cursed' && +this.date !== +this.ctx.date;
        },
        preventDrag() {
            return this.emote === 'cursed' &&
                !this.ctx.items.some(item => item.type === 'curse' && +item.date === +this.ctx.date);
        },
        willConsume(item) {
            return this.emote === 'cursed' && (
                (item.type === 'event' && +this.date === +item.date)
                || item.type === 'music'
            );
        },
        onConsume(item) {
            this.emote = null;
            this.hasConsumed.length = 0;
        },
    };
}
