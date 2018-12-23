import json
import os
from bs4 import BeautifulSoup
import requests

pokemon = {}

dirpath = os.path.dirname(os.path.realpath(__file__))
url = 'https://serebii.net/pokemongo/pokemon.shtml'
table_selector = 'table:nth-of-type(6) > tr'

r = requests.get(url)
soup = BeautifulSoup(r.text, 'html.parser')
results = {}

for index, row in enumerate(soup.select(table_selector)):
  if index != 0:
    pokemon = {}
    items = row.select('td')
    name = ""
    pokemon['captured'] = False
    pokemon['evoles'] = 5
    pokemon['number'] = items[0].get_text().replace('#', '').strip()
    pokemon['image'] = 'https://serebii.net' + items[1].find('img').get('src').strip()
    condition = ""
    types = []
    for idx, string in enumerate(items[3].stripped_strings):
      item = repr(string)
      if idx == 0:
        name = item.strip()
        pokemon['name'] = name.replace("'", '')
      if idx == 1 and '(' in item and ')' in item:
        pokemon['form'] = item.replace("'", '').replace('(', '').replace(')', '').strip()
      if idx == 1 and '(' not in item:
        pokemon['condition'] = item.replace('"', '').replace('\/', '').replace("'", '').strip()
    href = items[3].select('a')[0].href
    types = []
    for entry in items[4].find_all('a'):
      types.append(entry.get('href').replace('/pokedex-sm/', '').replace('.shtml', ''))
    pokemon['type'] = types
    if not 'form' in pokemon.keys():
      results[pokemon['name']] = pokemon
    row.select('td')[0].get_text().strip().replace('#', '')
    egg_distance = items[18].get_text()
    if 'km' in egg_distance:
      pokemon['egg_distance'] = int(egg_distance.replace('km', '').strip())
print(results)
with open(dirpath + '/../public/pokedex.json', 'w') as file:
  json.dump(results, file, indent=2)