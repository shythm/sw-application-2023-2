# extract hdd model and capacity from S.M.A.R.T. data
import pandas as pd
import sys
import os

def extract(path: str, output: str):
    print(f'extracting hdd model and capacity from {path}...')

    # get the file list
    files = os.listdir(path)
    files.sort()

    # a set of (model, capacity) pair
    model_capacity: set[tuple[str, str]] = set()

    for file in files:
        print(f'  extracting {file}...')

        # read the csv files (join the path and the file name)
        df = pd.read_csv(os.path.join(path, file))

        # get the unique hdd (model, capacity_bytes) pair
        unique_pairs = df[['model', 'capacity_bytes']].drop_duplicates().values
        unique_tuples: list[tuple[str, str]] = [tuple(x) for x in unique_pairs]

        # add the unique pairs to the set
        model_capacity.update(unique_tuples)

    # sort the set by model name
    model_capacity_list = list(model_capacity)
    model_capacity_list.sort(key=lambda x: x[0])

    # write the set to a csv file
    print(f'writing to {output}...')
    with open(output, 'w') as f:
        f.write('model,capacity_bytes\n')
        for [model, capacity] in model_capacity_list:
            f.write(f'{model},{capacity}\n')

    print(f'done with {path}.')

if __name__ == '__main__':
    # print usage
    if len(sys.argv) != 3:
        print(f'usage: python {sys.argv[0]} <path> <output>')
        exit(1)

    # get the path and output file name
    path = sys.argv[1]
    output = sys.argv[2]

    extract(path, output)
