import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix SideNavBar links (dashboard, auto_stories, psychology, insights, settings)
    content = re.sub(r'href="#"([^>]*>\s*<span[^>]*>dashboard</span>)', r'href="dashboard.html"\1', content)
    content = re.sub(r'href="#"([^>]*>\s*<span[^>]*>auto_stories</span>)', r'href="library.html"\1', content)
    content = re.sub(r'href="#"([^>]*>\s*<span[^>]*>psychology</span>)', r'href="ai_assistant.html"\1', content)
    content = re.sub(r'href="#"([^>]*>\s*<span[^>]*>insights</span>)', r'href="profile.html"\1', content)
    content = re.sub(r'href="#"([^>]*>\s*<span[^>]*>settings</span>)', r'href="settings.html"\1', content)

    # Convert Mobile NavBar <button> to <a href="...">
    content = re.sub(r'<button([^>]*)(?=\s*>.*<span[^>]*>home</span>)', r'<a href="dashboard.html"\1', content, flags=re.DOTALL)
    content = re.sub(r'<button([^>]*)(?=\s*>.*<span[^>]*>book</span>)', r'<a href="library.html"\1', content, flags=re.DOTALL)
    content = re.sub(r'<button([^>]*)(?=\s*>.*<span[^>]*>smart_toy</span>)', r'<a href="ai_assistant.html"\1', content, flags=re.DOTALL)
    content = re.sub(r'<button([^>]*)(?=\s*>.*<span[^>]*>person</span>)', r'<a href="profile.html"\1', content, flags=re.DOTALL)

    # Also change the closing </button> back to </a> for these specific items, but only in mobile nav. 
    # A simple way is to find the block of mobile nav and replace </button> with </a>.
    if '<nav class="md:hidden' in content:
        # Split at mobile nav to only replace </button> with </a> inside it
        parts = content.split('<nav class="md:hidden')
        if len(parts) > 1:
            # Reconstruct with </button> -> </a> in the last part (mobile nav)
            last_part = parts[-1].replace('</button>', '</a>')
            content = parts[0] + '<nav class="md:hidden' + last_part

    # Fix existing <a href="#"> in Mobile NavBar
    content = re.sub(r'href="#"([^>]*>\s*<span[^>]*>home</span>)', r'href="dashboard.html"\1', content)
    content = re.sub(r'href="#"([^>]*>\s*<span[^>]*>book</span>)', r'href="library.html"\1', content)
    content = re.sub(r'href="#"([^>]*>\s*<span[^>]*>smart_toy</span>)', r'href="ai_assistant.html"\1', content)
    content = re.sub(r'href="#"([^>]*>\s*<span[^>]*>person</span>)', r'href="profile.html"\1', content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Navigation fixed successfully.")
