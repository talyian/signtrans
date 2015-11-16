import requests, json, os, functools, itertools as it

def memo_file(get_json_func):
    @functools.wraps(get_json_func)
    def new_func(category):
        filename = category + ".json"
        try: return json.load(open(filename))
        except: pass

        val = get_json_func(category)
        json.dump(val, open(filename, 'w'))
        return val
    return new_func

@memo_file
def category_pages(category):
    return requests.get('https://en.wiktionary.org/w/api.php', params={
        'action':'query',
        'list':'categorymembers',
        'cmtitle':'Category:' + category,
        'cmlimit':'500',
        'format':'json'
    }).json()['query']['categorymembers']

import json
nouns = category_pages('American_Sign_Language_nouns')
verbs = category_pages('American_Sign_Language_verbs')

for lemma in filter(lambda c:c['ns']==14, category_pages('American_Sign_Language_lemmas')):
    category = lemma['title'].split(':')[1]
    print category
    for word in it.islice(filter(lambda c:c['ns']==0, category_pages(category.replace(' ', '_'))), 0, 10):
        print '    ', word['title']
