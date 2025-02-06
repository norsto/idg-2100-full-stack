with open('acronyms.txt') as file:
    text = file.read()

lines = text.split('\n')

#print(lines)

for line in lines:
    element = line.split('\n')
    #print(line)
    alphabethic = sorted(element)

    acronyms = alphabethic.sort()

    print(acronyms)
