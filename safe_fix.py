import urllib.request
import re
import os

urls = {
    "reader.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzZiYWM5M2NjYTk5NDQ5YTQ5NjRhN2ZmNzg4MjRhZjY2EgsSBxDzsaTG5xIYAZIBIwoKcHJvamVjdF9pZBIVQhM1ODc2NjM4ODU1MDI1NDk1Nzg2&filename=&opi=89354086",
    "ai_assistant.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2MxNWE2NWQ1YTliNDQ2MWRiZWIyOWI5YTgwNjcwZmZjEgsSBxDzsaTG5xIYAZIBIwoKcHJvamVjdF9pZBIVQhM1ODc2NjM4ODU1MDI1NDk1Nzg2&filename=&opi=89354086",
    "dashboard.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzkxOTVlYjhiOTk5OTQ5Mzc4MzgxNmNhYTRhZTA3NzAyEgsSBxDzsaTG5xIYAZIBIwoKcHJvamVjdF9pZBIVQhM1ODc2NjM4ODU1MDI1NDk1Nzg2&filename=&opi=89354086",
    "book_details.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzQzMGUyZGQ1ZmIyMDQ0NmJiN2M1NDE0ZDE1NGUxNjg0EgsSBxDzsaTG5xIYAZIBIwoKcHJvamVjdF9pZBIVQhM1ODc2NjM4ODU1MDI1NDk1Nzg2&filename=&opi=89354086",
    "library.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2E1NTBlNGIxYjg4YTQ0NDdiMDg0ZWM1ZTIxMmYyODQxEgsSBxDzsaTG5xIYAZIBIwoKcHJvamVjdF9pZBIVQhM1ODc2NjM4ODU1MDI1NDk1Nzg2&filename=&opi=89354086",
    "profile.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2QyMDA3Mjg2MzM3NDQyN2ZhZjhhZmUwZjAzMjRhOWE2EgsSBxDzsaTG5xIYAZIBIwoKcHJvamVjdF9pZBIVQhM1ODc2NjM4ODU1MDI1NDk1Nzg2&filename=&opi=89354086",
    "authentication.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzliNWM0NmEyZGRiOTRjY2ZiNjM4NGEwNDhiOTgzMmQyEgsSBxDzsaTG5xIYAZIBIwoKcHJvamVjdF9pZBIVQhM1ODc2NjM4ODU1MDI1NDk1Nzg2&filename=&opi=89354086",
    "settings.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzUyMWMxNDRjYzljMTRjMzZiZWEwODEwMGJmNjFjYTYyEgsSBxDzsaTG5xIYAZIBIwoKcHJvamVjdF9pZBIVQhM1ODc2NjM4ODU1MDI1NDk1Nzg2&filename=&opi=89354086"
}

common_css = set()

# 1. Download
for filename, url in urls.items():
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        content = response.read().decode('utf-8')
        
        # Extract CSS
        style_matches = re.findall(r'<style>(.*?)</style>', content, re.DOTALL)
        for match in style_matches:
            common_css.add(match.strip())
            
        content = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL)
        content = content.replace('</head>', '    <link rel="stylesheet" href="assets/css/style.css">\n</head>')
        content = content.replace('</body>', '    <script src="assets/js/main.js"></script>\n</body>')
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)

os.makedirs('assets/css', exist_ok=True)
with open('assets/css/style.css', 'w', encoding='utf-8') as f:
    for css in common_css:
        f.write(css + "\n\n")

# 2. Fix Navigation Carefully
# Use BeautifulSoup if possible, but since it's not guaranteed, we will use precise regex without DOTALL.
for filename in urls.keys():
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Desktop Nav links (they have `>Discover<`)
    content = re.sub(r'href="#"([^>]*>Discover<)', r'href="dashboard.html"\1', content)
    content = re.sub(r'href="#"([^>]*>Library<)', r'href="library.html"\1', content)
    content = re.sub(r'href="#"([^>]*>AI Insights<)', r'href="ai_assistant.html"\1', content)
    
    # Sidebar Links (Home, My Library, AI Assistant, Stats, Settings)
    # The span contains the icon name, the next span contains the text.
    # We will just replace href="#" if the text inside the anchor contains "Home"
    # To do this safely, we will find all <a ... href="#">...</a> blocks and replace href="#"
    
    # Find all <a> tags
    def replace_a_href(match):
        a_tag = match.group(0)
        if '>Discover<' in a_tag or '>Home<' in a_tag:
            return a_tag.replace('href="#"', 'href="dashboard.html"')
        elif '>Library<' in a_tag or '>My Library<' in a_tag:
            return a_tag.replace('href="#"', 'href="library.html"')
        elif '>AI Insights<' in a_tag or '>AI Assistant<' in a_tag or '>AI Assist<' in a_tag:
            return a_tag.replace('href="#"', 'href="ai_assistant.html"')
        elif '>Profile<' in a_tag or '>Stats<' in a_tag or '"account_circle"' in a_tag:
            return a_tag.replace('href="#"', 'href="profile.html"')
        elif '>Settings<' in a_tag:
            return a_tag.replace('href="#"', 'href="settings.html"')
        return a_tag

    content = re.sub(r'<a\s+[^>]*>.*?</a>', replace_a_href, content, flags=re.DOTALL)
    
    # Bottom Nav might use <button> or <a> for the links.
    # We can convert <button> to <a href="..."> if it contains the nav text.
    def replace_button_nav(match):
        btn_tag = match.group(0)
        # Only change if it's in the bottom nav (contains flex flex-col items-center)
        if 'flex-col items-center' in btn_tag:
            href = ""
            if '>Home<' in btn_tag: href = 'dashboard.html'
            elif '>Library<' in btn_tag: href = 'library.html'
            elif '>AI Assist<' in btn_tag: href = 'ai_assistant.html'
            elif '>Profile<' in btn_tag: href = 'profile.html'
            
            if href:
                btn_tag = btn_tag.replace('<button', f'<a href="{href}"')
                btn_tag = btn_tag.replace('</button>', '</a>')
        return btn_tag

    content = re.sub(r'<button\s+[^>]*>.*?</button>', replace_button_nav, content, flags=re.DOTALL)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Redownloaded and fixed navigation cleanly.")
