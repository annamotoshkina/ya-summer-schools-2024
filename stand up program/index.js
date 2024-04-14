
const fs = require('node:fs/promises');

async function parseFile(fileName) {
  try {
    const data = await fs.readFile(fileName, { encoding: 'utf-8' });
    const lines = data.split('\n');

    if (lines.length < 3) {
        throw new Error('Not enough data!');
    }

    const ai = lines[2].split(' ');
    for (i = 0; i < ai.length; i++) {
        ai[i] = Number.parseInt(ai[i]);
    }
    
    return {
        k: Number.parseInt(lines[0]),
        ai,
    };

  } catch (error) {
    console.error(error);
  }
}

async function writeFile(fileName, content) {
    try {
        await fs.writeFile(fileName, content.toString());
    } catch (error) {
        console.error(error);
    }
}

async function calculateSecondsForNewJoke() {
    const { k, ai } = await parseFile('input.txt');

    const cumulativeSums = new Array(ai.length);
    cumulativeSums[0] = ai[0];
    const reverseSumsWithShift = new Array(ai.length);
    reverseSumsWithShift[ai.length - 1] = ai[ai.length - 1] * (ai.length + 1);

    for (i = 1; i < ai.length; i++) {
        cumulativeSums[i] = cumulativeSums[i - 1] + ai[i] * (i + 1);
        const reverseIndex = ai.length - 1 - i;
        reverseSumsWithShift[reverseIndex] = reverseSumsWithShift[reverseIndex + 1] + 
            ai[reverseIndex] * (reverseIndex + 2);
    }
    
    let maxNewTotalFun = k + reverseSumsWithShift[0];
    for (i = 1; i < ai.length; i++) {
        const newTotalFun = cumulativeSums[i - 1] + k * (i + 1) + reverseSumsWithShift[i];
        maxNewTotalFun= Math.max(newTotalFun, maxNewTotalFun);
    }
    maxNewTotalFun = Math.max(cumulativeSums[ai.length - 1] + k * (ai.length + 1), maxNewTotalFun);

    await writeFile('output.txt', maxNewTotalFun - cumulativeSums[ai.length - 1]);
}

calculateSecondsForNewJoke();
