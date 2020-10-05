const { program } = require('commander');
const { caesar } = require('./js/function.js');
const fs = require('fs');
const { Transform, pipeline } = require('stream')

const runAction = (options) => {

    if (isNaN(options.shift)) {
        console.error('Shift must be integer');
        process.exit(1);
    };

    if (!(options.action === 'encode' || options.action === 'decode')) {
        console.error('Action must be "encode"/"decode"');
        process.exit(1)
    }

    if (options.input) {
        fs.stat(options.input, (err) => {
            if (err) {
                err.code === 'ENOENT' ? console.error(`Input file ${options.input} not found`) : console.error(err.message)
                process.exit(1)
            }
        })

        if (options.output) {
            fs.stat(options.output, (err) => {
                if (err) {
                    err.code === 'ENOENT' ? console.error(`Output file ${options.output} not found`) : console.error(err.message)
                    process.exit(1)
                }
            })
            const transtream = new Transform({
                transform(chunk, encoding, callback) {
                    this.push(caesar(chunk.toString(), parseInt(options.shift), options.action));
                }
            });

            pipeline(
                fs.createReadStream(options.input),
                transtream,
                fs.createWriteStream(options.output, {
                    flags: 'a'
                }),
                (err) => {
                    if (err) {
                        console.error('error: ', err);
                    } else {
                        console.log('success');
                    }
                }
            );
        }
        else {
            const readStream = fs.createReadStream(options.input);
            readStream.on('data', data => console.log(caesar(data.toString(), parseInt(options.shift), options.action)));
        }
    }
    else {
        console.log(`Enter text for ${options.action} or Ctrl+C for exit:`);
        process.stdin.on('readable', () => {
            const text = process.stdin.read();
            if (text && (text == 'Ctrl+C')) {
                process.stdin.end();
            } else {
                console.log(caesar(String(text), parseInt(options.shift), options.action));
                process.stdin.resume();
                console.log(`Enter text for ${options.action} or Ctrl+C for exit:`);
            }
        })
    }
};

program
    .storeOptionsAsProperties(false)
    .passCommandToAction(false)
    .option('-s, --shift <number>', 'a shift')
    .option('-i, --input <type>', 'an input file')
    .option('-o, --output <type>', 'an output file')
    .option('-a, --action <action>', 'an action encode/decode')
    .action(options => runAction(options));
program.parse(process.argv);