const fs = require('node:fs/promises');

function parseDate(date) {
    const [day, month, year] = date.split('.').map(string => Number.parseInt(string));
    return Date.UTC(year, month - 1, day );
}

async function parseFile(fileName) {
  try {
    const data = await fs.readFile(fileName, { encoding: 'utf-8' });
    const lines = data.split('\n');

    const filters = { };
    for (i = 1; i < 6; i++) {
        const [key, value] = lines[i].split(' ');
        filters[key] = value;
    }

    filters.NAME_CONTAINS = filters.NAME_CONTAINS.toLowerCase();
    filters.PRICE_GREATER_THAN = Number.parseInt(filters.PRICE_GREATER_THAN);
    filters.PRICE_LESS_THAN = Number.parseInt(filters.PRICE_LESS_THAN);
    filters.DATE_AFTER = parseDate(filters.DATE_AFTER);
    filters.DATE_BEFORE = parseDate(filters.DATE_BEFORE);
    
    return {
        goods: JSON.parse(lines[0]),
        filters,
    };

  } catch (error) {
    console.error(error);
  }
}

async function writeFile(fileName, content) {
    try {
        await fs.writeFile(fileName, JSON.stringify(content));
    } catch (error) {
        console.error(error);
    }
}

async function findGoods() {
    const { goods, filters } = await parseFile('input.txt');

    const filteredGoods = goods.filter(item => {
        if (!item.name.toLowerCase().includes(filters.NAME_CONTAINS)) {
            return false;
        }

        if (item.price < filters.PRICE_GREATER_THAN || item.price > filters.PRICE_LESS_THAN) {
            return false;
        }

        const date = parseDate(item.date);
        if (date < filters.DATE_AFTER || date > filters.DATE_BEFORE) {
            return false;
        }

        return true;
    }).sort((item1, item2) => item1.id - item2.id);

    await writeFile('output.txt', filteredGoods);
}

findGoods();
