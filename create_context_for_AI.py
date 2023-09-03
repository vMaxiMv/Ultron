import os


def process_path(path, output, depth=1):

  if os.path.isfile(path):
    process_file(path, output)

  elif os.path.isdir(path):

    for dirpath, dirnames, filenames in os.walk(path):

      if depth > 1:
        # Рекурсивный вызов для поддиректорий
        for dirname in dirnames:
          process_path(os.path.join(dirpath, dirname), output, depth-1)

      # Обрабатываем файлы в текущей директории
      for name in filenames:
        process_file(os.path.join(dirpath, name), output)

      # Прерываем рекурсию дальше текущего уровня
      dirnames.clear()


def process_file(file_path, output):
    extension = os.path.splitext(file_path)[1]
    if extension != '.gif' and '.png' and '.jpg':
        with open(file_path, 'rb') as source_file:
            content = source_file.read().decode('utf-8', errors='ignore')

        output.write(f'---------начало файла "{file_path}"---------\n')
        output.write(content)
        output.write(f'\n---------конец файла "{file_path}"---------\n')
        output.write('\n\n\n')


def create_txt(inputs, output='context.txt'):
    with open(output, 'w', encoding='utf-8', errors='ignore') as f:
        for input_path in inputs:
            process_path(path=input_path, depth=3, output=f)


inputs = [
    'src'
]

create_txt(inputs)