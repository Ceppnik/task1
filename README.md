# Task 1

## [task](https://github.com/rolling-scopes-school/nodejs-course-template/blob/master/TASKS.md#task-1-caesar-cipher-cli-tool)
## [cross-check](https://github.com/rolling-scopes-school/nodejs-course-template/blob/master/CROSSCHECK.md#task-1-caesar-cipher-cli-tool)

### Options:
- `-a` or `--action` should equal to `encode` or `decode` (required);
- `-s` or `--shift` should be integer (required);
- `-i` or `--input` should be a string. If the file is not found, a message will be displayed. If the parameter is absent, the result will be displayed in the console.
- `-o` or `--output` should be a string. If the file is not found, a message will be displayed. If the parameter is absent, the result will be displayed in the console.

Execute the code on the command line.

### Usage example:

```bash
node index -s 7 -a encode --input "./txt/input.txt" --output "./txt/output.txt"
```

```bash
node index -a encode -s 7 -i "./txt/input.txt" -o "./txt/output.txt"
```

```bash
node index -s 7 --action encode
```

```bash
node index --shift 7 -a decode
```

