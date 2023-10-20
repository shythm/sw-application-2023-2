import os
import sys

if __name__ == '__main__':
    # arguments validation
    if len(sys.argv) != 3:
        print(f'Usage: python {sys.argv[0]} <daily s.m.a.r.t data path> <output path>')
        sys.exit(1)

    # path that stores daily s.m.a.r.t data
    parent_path = sys.argv[1]

    # path that stores the output file
    output_path = sys.argv[2]

    # get file names in the path using `os.listdir`
    files = os.listdir(parent_path)
    files.sort()

    # write files to a single file
    with open(output_path, 'w') as single_file:
        print(f'Writing to {output_path}...')

        header = None
        for file in files:
            path = os.path.join(parent_path, file)
            print(f'Processing {path}...')

            with open(path, 'r') as daily_file:
                if header is None:
                    header = daily_file.readline()
                    single_file.write(header)
                else:
                    if header != daily_file.readline():
                        print(f'Header is not the same in {path}.')
                        sys.exit(1)

                lines = daily_file.readlines()
                for line in lines[1:]: # skip the first line
                    if line.split(',')[4] == '1':
                        single_file.write(line)

        print(f'{output_path} is saved.')