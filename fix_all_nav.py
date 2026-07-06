import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# Mapping of text/keywords to href destinations
replacements = {
    # Top and Side Nav text mappings
    '>Discover<': 'href="dashboard.html"',
    '>Home<': 'href="dashboard.html"',
    '>Library<': 'href="library.html"',
    '>My Library<': 'href="library.html"',
    '>AI Insights<': 'href="ai_assistant.html"',
    '>AI Assistant<': 'href="ai_assistant.html"',
    '>AI Assist<': 'href="ai_assistant.html"',
    '>Profile<': 'href="profile.html"',
    '>Stats<': 'href="profile.html"',
    '>Settings<': 'href="settings.html"',
    '>Reading Stats<': 'href="profile.html"',
    
    # Icon based mappings (when there is an icon next to text, or just an icon button)
    # The profile icon top right
    '"account_circle"': 'href="profile.html"',
    
    # Text links
    '>Terms of Service<': 'href="settings.html"',
    '>Privacy Policy<': 'href="settings.html"',
    '>Forgot password?<': 'href="authentication.html"',
    '>Log out of all devices<': 'href="authentication.html"'
}

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Strategy: Find every <a ... href="..."> and <button ...> that acts as nav
    # We will replace href="#" or empty href with correct one based on inner text.
    
    # Replace <a ...> tags
    def fix_a_tags(match):
        tag = match.group(0)
        # If the tag already has a valid html link that isn't '#', don't change unless it's '#'
        if 'href="#"' in tag or 'href=""' in tag or 'href=' not in tag:
            for keyword, href_attr in replacements.items():
                if keyword in tag:
                    if 'href=' in tag:
                        tag = re.sub(r'href=[\'"][^\'"]*[\'"]', href_attr, tag)
                    else:
                        tag = tag.replace('<a ', f'<a {href_attr} ')
                    break
        return tag

    content = re.sub(r'<a\s+[^>]*>.*?</a>', fix_a_tags, content, flags=re.DOTALL)
    
    # Replace <button ...> tags that should navigate
    def fix_button_tags(match):
        tag = match.group(0)
        
        target_href = None
        for keyword, href_attr in replacements.items():
            if keyword in tag:
                # Extract URL from href_attr (e.g. href="dashboard.html" -> dashboard.html)
                url = href_attr.split('"')[1]
                target_href = url
                break
                
        # Handle specific utility buttons
        if '>Back to Reader<' in tag:
            target_href = 'reader.html'
        elif '>Ask AI<' in tag:
            target_href = 'ai_assistant.html'
        elif '>Upgrade to Premium<' in tag or '>Upgrade Now<' in tag:
            target_href = 'settings.html'
        elif '>Save to My Insights<' in tag:
            target_href = 'profile.html'
        elif '>Enter Library<' in tag:
            target_href = 'dashboard.html'
            
        if target_href:
            # Change button to anchor if it doesn't have an onclick
            if 'onclick=' not in tag:
                # Replace <button with <a href="..." and </button> with </a>
                tag = re.sub(r'^<button', f'<a href="{target_href}"', tag)
                tag = re.sub(r'</button>$', '</a>', tag)
                
        return tag

    content = re.sub(r'<button\s+[^>]*>.*?</button>', fix_button_tags, content, flags=re.DOTALL)
    
    # Additional edge cases (like the mobile nav buttons that might just be buttons with icons)
    def fix_mobile_nav(match):
        tag = match.group(0)
        if '>home<' in tag or '"home"' in tag:
            tag = tag.replace('href="#"', 'href="dashboard.html"')
        elif '>book<' in tag or '"book"' in tag:
            tag = tag.replace('href="#"', 'href="library.html"')
        elif '>smart_toy<' in tag or '"smart_toy"' in tag:
            tag = tag.replace('href="#"', 'href="ai_assistant.html"')
        elif '>person<' in tag or '"person"' in tag:
            tag = tag.replace('href="#"', 'href="profile.html"')
        return tag
    
    # Find mobile navs
    if '<nav class="md:hidden' in content:
        parts = content.split('<nav class="md:hidden')
        if len(parts) > 1:
            nav_block = parts[-1]
            nav_block = re.sub(r'<a\s+[^>]*>.*?</a>', fix_mobile_nav, nav_block, flags=re.DOTALL)
            nav_block = re.sub(r'<button\s+[^>]*>.*?</button>', fix_mobile_nav, nav_block, flags=re.DOTALL)
            # Reconstruct
            content = parts[0] + '<nav class="md:hidden' + nav_block
            

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("All navigation endpoints integrated.")
