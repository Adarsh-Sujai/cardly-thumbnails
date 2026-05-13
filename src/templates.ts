import type { Template } from './types'

export const TEMPLATES: Template[] = [
  {
    id: 'github-repo',
    label: 'GitHub repo',
    description: 'Repo thumbnail with name, description, language and stars',
    width: 1200,
    height: 630,
    fields: [
      { key: 'repoFull', label: 'Repo (owner/name)', type: 'text', default: 'your-username / awesome-project' },
      { key: 'title', label: 'Tagline', type: 'text', default: 'Build cool things, fast.' },
      { key: 'description', label: 'Description', type: 'textarea', default: 'A tiny, dependency-free toolkit for shipping interactive UIs to the browser without the build-step circus.' },
      { key: 'language', label: 'Language', type: 'text', default: 'TypeScript' },
      { key: 'langColor', label: 'Language dot color', type: 'color', default: '#f1e05a' },
      { key: 'stars', label: 'Stars', type: 'text', default: '12.4k' },
      { key: 'forks', label: 'Forks', type: 'text', default: '842' },
      { key: 'bgColor', label: 'Background', type: 'color', default: '#0d1117' },
    ],
    html: `
<div style="
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: {{bgColor}};
  color: #e6edf3;
  padding: 64px 72px;
  font-family: Inter;
">
  <div style="display: flex; align-items: center; gap: 18px; color: #8b949e; font-size: 28px;">
    <svg width="36" height="36" viewBox="0 0 16 16" fill="#e6edf3" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
    </svg>
    {{repoFull}}
  </div>

  <div style="display: flex; margin-top: 32px; font-size: 80px; font-weight: 800; line-height: 1.05; color: #ffffff;">
    {{title}}
  </div>

  <div style="display: flex; margin-top: 28px; font-size: 30px; color: #8b949e; line-height: 1.35;">
    {{description}}
  </div>

  <div style="display: flex; align-items: center; gap: 28px; margin-top: auto; font-size: 26px;">
    <div style="display: flex; align-items: center; gap: 10px;">
      <div style="display: flex; width: 18px; height: 18px; border-radius: 50%; background: {{langColor}};"></div>
      <div style="display: flex; color: #c9d1d9;">{{language}}</div>
    </div>
    <div style="display: flex; align-items: center; gap: 10px; color: #c9d1d9;">
      <svg width="22" height="22" viewBox="0 0 16 16" fill="#c9d1d9" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
      </svg>
      {{stars}}
    </div>
    <div style="display: flex; align-items: center; gap: 10px; color: #c9d1d9;">
      <svg width="22" height="22" viewBox="0 0 16 16" fill="#c9d1d9" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.25 2.25 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0zM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0z"/>
      </svg>
      {{forks}}
    </div>
  </div>
</div>
`.trim(),
  },

  {
    id: 'blog-post',
    label: 'Blog post',
    description: 'Author, title, date in a newspaper style',
    width: 1200,
    height: 630,
    fields: [
      { key: 'kicker', label: 'Top line (blog name, date)', type: 'text', default: 'The Blog . Mar 12, 2026' },
      { key: 'title', label: 'Post title', type: 'textarea', default: 'Why we rewrote the build system from scratch' },
      { key: 'authorName', label: 'Author name', type: 'text', default: 'Jane Engineer' },
      { key: 'authorRole', label: 'Author role', type: 'text', default: 'Staff Engineer' },
      { key: 'avatarColor', label: 'Avatar color', type: 'color', default: '#7c5cff' },
    ],
    html: `
<div style="
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fafaf7;
  color: #1a1a1a;
  padding: 80px 96px;
  font-family: Inter;
">
  <div style="display: flex; font-size: 24px; text-transform: uppercase; letter-spacing: 4px; color: #888;">
    {{kicker}}
  </div>
  <div style="display: flex; margin-top: 36px; font-size: 84px; font-weight: 800; line-height: 1.05; letter-spacing: -1.5px; color: #0a0a0a;">
    {{title}}
  </div>
  <div style="display: flex; margin-top: auto; align-items: center; gap: 20px; font-size: 28px;">
    <div style="display: flex; width: 64px; height: 64px; border-radius: 50%; background: {{avatarColor}};"></div>
    <div style="display: flex; flex-direction: column;">
      <div style="display: flex; font-weight: 700; color: #0a0a0a;">{{authorName}}</div>
      <div style="display: flex; color: #888;">{{authorRole}}</div>
    </div>
  </div>
</div>
`.trim(),
  },

  {
    id: 'youtube-thumb',
    label: 'YouTube thumbnail',
    description: 'Bold, high-contrast 1280x720 video thumbnail',
    width: 1280,
    height: 720,
    fields: [
      { key: 'tag', label: 'Top label', type: 'text', default: 'Tutorial' },
      { key: 'title', label: 'Main title', type: 'textarea', default: 'I built this in 1 hour' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', default: '(and you can too)' },
      { key: 'bgFrom', label: 'Gradient start', type: 'color', default: '#ff0055' },
      { key: 'bgTo', label: 'Gradient end', type: 'color', default: '#1a0033' },
      { key: 'badge', label: 'Top-right badge', type: 'text', default: 'NEW' },
    ],
    html: `
<div style="
  display: flex;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, {{bgFrom}} 0%, {{bgTo}} 100%);
  color: #ffffff;
  padding: 80px;
  font-family: Inter;
  position: relative;
">
  <div style="display: flex; flex-direction: column; width: 65%; justify-content: center;">
    <div style="display: flex; align-items: center; gap: 12px; font-size: 28px; font-weight: 600; color: #ffd166; text-transform: uppercase; letter-spacing: 2px;">
      <div style="display: flex; width: 16px; height: 16px; border-radius: 50%; background: #ffd166;"></div>
      {{tag}}
    </div>
    <div style="display: flex; margin-top: 24px; font-size: 110px; font-weight: 800; line-height: 0.95; letter-spacing: -3px; text-shadow: 0 6px 24px rgba(0,0,0,0.4);">
      {{title}}
    </div>
    <div style="display: flex; margin-top: 28px; font-size: 32px; opacity: 0.85; font-weight: 500;">
      {{subtitle}}
    </div>
  </div>
  <div style="display: flex; position: absolute; top: 40px; right: 40px; align-items: center; gap: 12px; background: rgba(0,0,0,0.5); padding: 12px 22px; border-radius: 999px; font-size: 24px; font-weight: 600;">
    <div style="display: flex; width: 12px; height: 12px; border-radius: 50%; background: #ff3b3b;"></div>
    {{badge}}
  </div>
</div>
`.trim(),
  },

  {
    id: 'linkedin-banner',
    label: 'LinkedIn banner',
    description: 'Profile banner at 1584x396 with name, role and tagline',
    width: 1584,
    height: 396,
    fields: [
      { key: 'greeting', label: 'Greeting', type: 'text', default: "Hi, I'm Alex Rivera." },
      { key: 'tagline', label: 'Tagline', type: 'text', default: 'Senior product engineer . Building tools developers love.' },
      { key: 'link1', label: 'Link 1', type: 'text', default: 'alex.dev' },
      { key: 'link2', label: 'Link 2', type: 'text', default: '@alex_rivera' },
      { key: 'initials', label: 'Avatar initials', type: 'text', default: 'AR' },
      { key: 'bgFrom', label: 'Gradient start', type: 'color', default: '#0a66c2' },
      { key: 'bgTo', label: 'Gradient end', type: 'color', default: '#0a2540' },
    ],
    html: `
<div style="
  display: flex;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, {{bgFrom}} 0%, {{bgTo}} 100%);
  color: #ffffff;
  padding: 64px 96px;
  font-family: Inter;
  align-items: center;
  justify-content: space-between;
">
  <div style="display: flex; flex-direction: column;">
    <div style="display: flex; font-size: 56px; font-weight: 800; letter-spacing: -1px;">
      {{greeting}}
    </div>
    <div style="display: flex; margin-top: 16px; font-size: 30px; opacity: 0.85;">
      {{tagline}}
    </div>
    <div style="display: flex; margin-top: 24px; gap: 16px; font-size: 22px; opacity: 0.75;">
      <div style="display: flex;">{{link1}}</div>
      <div style="display: flex;">.</div>
      <div style="display: flex;">{{link2}}</div>
    </div>
  </div>
  <div style="display: flex; align-items: center; justify-content: center; width: 200px; height: 200px; border-radius: 50%; background: rgba(255,255,255,0.08); border: 2px solid rgba(255,255,255,0.25); font-size: 80px; font-weight: 700;">
    {{initials}}
  </div>
</div>
`.trim(),
  },

  {
    id: 'twitter-header',
    label: 'X / Twitter header',
    description: 'Profile cover at 1500x500',
    width: 1500,
    height: 500,
    fields: [
      { key: 'title', label: 'Big title', type: 'text', default: 'Shipping software, mostly.' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'Threads about engineering, design and the occasional cat photo.' },
      { key: 'link', label: 'Link', type: 'text', default: 'sandbox.dev/@you' },
      { key: 'bgColor', label: 'Background', type: 'color', default: '#000000' },
      { key: 'accent', label: 'Accent color', type: 'color', default: '#1d9bf0' },
    ],
    html: `
<div style="
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: {{bgColor}};
  color: #ffffff;
  padding: 72px 96px;
  font-family: Inter;
  justify-content: center;
">
  <div style="display: flex; font-size: 88px; font-weight: 800; letter-spacing: -2px; line-height: 1;">
    {{title}}
  </div>
  <div style="display: flex; margin-top: 32px; font-size: 30px; color: #8a8f98;">
    {{subtitle}}
  </div>
  <div style="display: flex; margin-top: 28px; align-items: center; gap: 16px; font-size: 24px; color: {{accent}};">
    <div style="display: flex; width: 12px; height: 12px; border-radius: 50%; background: {{accent}};"></div>
    {{link}}
  </div>
</div>
`.trim(),
  },

  {
    id: 'twitter-card',
    label: 'X / Twitter card',
    description: 'Link preview card at 1200x675 (summary_large_image)',
    width: 1200,
    height: 675,
    fields: [
      { key: 'siteName', label: 'Site name', type: 'text', default: 'sandbox.dev' },
      { key: 'title', label: 'Title', type: 'textarea', default: 'The hidden cost of "just one more dependency"' },
      { key: 'description', label: 'Description', type: 'textarea', default: 'Notes on bundle bloat, security surface and the surprising upside of vendoring small utilities.' },
      { key: 'readTime', label: 'Read time', type: 'text', default: '8 min read' },
      { key: 'author', label: 'Author handle', type: 'text', default: 'by @you' },
    ],
    html: `
<div style="
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #15202b;
  color: #ffffff;
  padding: 72px;
  font-family: Inter;
">
  <div style="display: flex; align-items: center; gap: 14px; font-size: 26px; color: #8b98a5;">
    <div style="display: flex; width: 14px; height: 14px; border-radius: 50%; background: #1d9bf0;"></div>
    {{siteName}}
  </div>
  <div style="display: flex; margin-top: 28px; font-size: 78px; font-weight: 800; line-height: 1.05; letter-spacing: -1.5px;">
    {{title}}
  </div>
  <div style="display: flex; margin-top: 24px; font-size: 30px; color: #8b98a5;">
    {{description}}
  </div>
  <div style="display: flex; margin-top: auto; align-items: center; gap: 16px; font-size: 24px; color: #8b98a5;">
    <div style="display: flex;">{{readTime}}</div>
    <div style="display: flex;">.</div>
    <div style="display: flex;">{{author}}</div>
  </div>
</div>
`.trim(),
  },

  {
    id: 'product-hunt',
    label: 'Product launch',
    description: 'Product Hunt style launch card with name, tagline and CTA',
    width: 1200,
    height: 630,
    fields: [
      { key: 'brandLetter', label: 'Brand letter', type: 'text', default: 'P' },
      { key: 'brandColor', label: 'Brand color', type: 'color', default: '#da552f' },
      { key: 'brandName', label: 'Product name', type: 'text', default: 'Pulsekit' },
      { key: 'status', label: 'Status line', type: 'text', default: 'Launching today on Product Hunt' },
      { key: 'headline', label: 'Headline', type: 'textarea', default: 'The fastest way to ship realtime dashboards.' },
      { key: 'ctaLabel', label: 'Button label', type: 'text', default: 'Get it free' },
      { key: 'domain', label: 'Domain', type: 'text', default: 'pulsekit.dev' },
    ],
    html: `
<div style="
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #ffffff;
  color: #1f2937;
  padding: 72px;
  font-family: Inter;
">
  <div style="display: flex; align-items: center; gap: 20px;">
    <div style="display: flex; align-items: center; justify-content: center; width: 96px; height: 96px; border-radius: 24px; background: {{brandColor}}; color: white; font-size: 56px; font-weight: 800;">
      {{brandLetter}}
    </div>
    <div style="display: flex; flex-direction: column;">
      <div style="display: flex; font-size: 56px; font-weight: 800; letter-spacing: -1.5px;">
        {{brandName}}
      </div>
      <div style="display: flex; font-size: 24px; color: #6b7280;">
        {{status}}
      </div>
    </div>
  </div>
  <div style="display: flex; margin-top: 56px; font-size: 64px; font-weight: 700; line-height: 1.1; letter-spacing: -1px; color: #0f172a;">
    {{headline}}
  </div>
  <div style="display: flex; margin-top: auto; align-items: center; justify-content: space-between;">
    <div style="display: flex; align-items: center; gap: 12px; padding: 16px 28px; background: {{brandColor}}; color: white; border-radius: 16px; font-size: 28px; font-weight: 700;">
      {{ctaLabel}}
    </div>
    <div style="display: flex; font-size: 22px; color: #6b7280;">
      {{domain}}
    </div>
  </div>
</div>
`.trim(),
  },

  {
    id: 'discord-embed',
    label: 'Discord embed',
    description: 'Rich embed style with the classic left color bar',
    width: 1200,
    height: 630,
    fields: [
      { key: 'brandLetter', label: 'Brand letter', type: 'text', default: 'P' },
      { key: 'brandName', label: 'Brand name', type: 'text', default: 'Pulsekit' },
      { key: 'brandColor', label: 'Embed bar color', type: 'color', default: '#5865f2' },
      { key: 'title', label: 'Title', type: 'textarea', default: 'Realtime dashboards in five minutes' },
      { key: 'description', label: 'Description', type: 'textarea', default: 'Drop in a websocket URL and get a live chart. No backend, no database, no kidding.' },
      { key: 'footer', label: 'Footer text', type: 'text', default: 'pulsekit.dev' },
    ],
    html: `
<div style="
  display: flex;
  width: 100%;
  height: 100%;
  background: #2b2d31;
  font-family: Inter;
  padding: 72px;
  align-items: center;
">
  <div style="display: flex; width: 12px; align-self: stretch; background: {{brandColor}}; border-radius: 6px 0 0 6px;"></div>
  <div style="
    display: flex;
    flex-direction: column;
    flex: 1;
    background: #1e1f22;
    padding: 56px 64px;
    border-radius: 0 12px 12px 0;
    color: #dbdee1;
  ">
    <div style="display: flex; align-items: center; gap: 16px; font-size: 26px; color: #b5bac1;">
      <div style="display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 50%; background: {{brandColor}}; color: white; font-size: 22px; font-weight: 700;">{{brandLetter}}</div>
      {{brandName}}
    </div>
    <div style="display: flex; margin-top: 32px; font-size: 56px; font-weight: 700; line-height: 1.1; letter-spacing: -1px; color: #00a8fc;">
      {{title}}
    </div>
    <div style="display: flex; margin-top: 24px; font-size: 28px; color: #dbdee1; line-height: 1.35;">
      {{description}}
    </div>
    <div style="display: flex; margin-top: 32px; align-items: center; gap: 14px; font-size: 22px; color: #949ba4;">
      <div style="display: flex; width: 10px; height: 10px; border-radius: 50%; background: #57f287;"></div>
      {{footer}}
    </div>
  </div>
</div>
`.trim(),
  },

  {
    id: 'slack-unfurl',
    label: 'Slack unfurl',
    description: 'Clean white card with site name, title, description',
    width: 1200,
    height: 630,
    fields: [
      { key: 'brandLetter', label: 'Brand letter', type: 'text', default: 'A' },
      { key: 'brandColor', label: 'Brand color', type: 'color', default: '#1264a3' },
      { key: 'siteName', label: 'Site name', type: 'text', default: 'Acme blog' },
      { key: 'title', label: 'Title', type: 'textarea', default: 'What I learned shipping side projects on Friday nights' },
      { key: 'description', label: 'Description', type: 'textarea', default: 'Three years, twelve launches, two thousand emails. Here is what stuck and what definitely did not.' },
      { key: 'domain', label: 'Domain', type: 'text', default: 'acme.blog' },
    ],
    html: `
<div style="
  display: flex;
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  font-family: Inter;
  padding: 72px;
  align-items: center;
">
  <div style="display: flex; width: 8px; align-self: stretch; background: {{brandColor}}; border-radius: 4px;"></div>
  <div style="
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 28px;
    padding: 8px 0;
  ">
    <div style="display: flex; align-items: center; gap: 14px; font-size: 26px; color: #4a4a4a;">
      <div style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 8px; background: {{brandColor}}; color: white; font-size: 20px; font-weight: 700;">{{brandLetter}}</div>
      {{siteName}}
    </div>
    <div style="display: flex; margin-top: 28px; font-size: 52px; font-weight: 700; line-height: 1.1; letter-spacing: -1px; color: {{brandColor}};">
      {{title}}
    </div>
    <div style="display: flex; margin-top: 24px; font-size: 26px; color: #454545; line-height: 1.4;">
      {{description}}
    </div>
    <div style="display: flex; margin-top: 28px; font-size: 20px; color: #8a8a8a;">
      {{domain}}
    </div>
  </div>
</div>
`.trim(),
  },

  {
    id: 'imessage-link',
    label: 'iMessage rich link',
    description: 'Big image with title overlay, iOS-style rounded card',
    width: 1200,
    height: 630,
    fields: [
      { key: 'kicker', label: 'Top label', type: 'text', default: 'Long read' },
      { key: 'title', label: 'Big title', type: 'textarea', default: 'The internet we lost.' },
      { key: 'pageTitle', label: 'Footer title', type: 'text', default: 'The internet we lost' },
      { key: 'domain', label: 'Domain', type: 'text', default: 'essays.dev' },
      { key: 'bgFrom', label: 'Gradient start', type: 'color', default: '#ff7a59' },
      { key: 'bgMid', label: 'Gradient middle', type: 'color', default: '#d62976' },
      { key: 'bgTo', label: 'Gradient end', type: 'color', default: '#4f5bd5' },
    ],
    html: `
<div style="
  display: flex;
  width: 100%;
  height: 100%;
  background: #f2f2f7;
  font-family: Inter;
  padding: 60px;
  align-items: center;
  justify-content: center;
">
  <div style="
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius: 32px;
    overflow: hidden;
    box-shadow: 0 24px 60px rgba(0,0,0,0.18);
    background: linear-gradient(135deg, {{bgFrom}} 0%, {{bgMid}} 50%, {{bgTo}} 100%);
  ">
    <div style="
      display: flex;
      flex: 1;
      padding: 56px 64px;
      align-items: flex-end;
    ">
      <div style="display: flex; flex-direction: column; color: white;">
        <div style="display: flex; font-size: 28px; opacity: 0.85; text-transform: uppercase; letter-spacing: 3px;">
          {{kicker}}
        </div>
        <div style="display: flex; margin-top: 16px; font-size: 80px; font-weight: 800; line-height: 1; letter-spacing: -2px;">
          {{title}}
        </div>
      </div>
    </div>
    <div style="
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px 40px;
      background: rgba(255,255,255,0.95);
      color: #1c1c1e;
      font-size: 24px;
    ">
      <div style="display: flex; flex-direction: column;">
        <div style="display: flex; font-weight: 600;">{{pageTitle}}</div>
        <div style="display: flex; font-size: 20px; color: #8a8a8e; margin-top: 4px;">{{domain}}</div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px; color: #8a8a8e; font-size: 22px;">
        Safari
      </div>
    </div>
  </div>
</div>
`.trim(),
  },

  {
    id: 'basic-og',
    label: 'Open Graph card',
    description: 'Centered title + subtitle on a gradient, 1200x630',
    width: 1200,
    height: 630,
    fields: [
      { key: 'title', label: 'Title', type: 'textarea', default: 'Your headline goes here' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'A short subtitle that explains what this is about.' },
      { key: 'bgFrom', label: 'Gradient start', type: 'color', default: '#7c5cff' },
      { key: 'bgTo', label: 'Gradient end', type: 'color', default: '#1d1147' },
    ],
    html: `
<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, {{bgFrom}} 0%, {{bgTo}} 100%);
  color: white;
  padding: 80px;
  text-align: center;
  font-family: Inter;
">
  <div style="display: flex; font-size: 96px; font-weight: 800; line-height: 1.05; letter-spacing: -2px;">
    {{title}}
  </div>
  <div style="display: flex; margin-top: 32px; font-size: 36px; opacity: 0.85; font-weight: 400;">
    {{subtitle}}
  </div>
</div>
`.trim(),
  },

  {
    id: 'blank',
    label: 'Blank canvas',
    description: 'Empty 1200x630 canvas to start from scratch',
    width: 1200,
    height: 630,
    fields: [
      { key: 'text', label: 'Text', type: 'text', default: 'Edit me' },
      { key: 'bgColor', label: 'Background', type: 'color', default: '#ffffff' },
      { key: 'textColor', label: 'Text color', type: 'color', default: '#999999' },
    ],
    html: `
<div style="
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: {{bgColor}};
  color: {{textColor}};
  font-family: Inter;
  font-size: 48px;
">
  {{text}}
</div>
`.trim(),
  },
]

export const DEFAULT_TEMPLATE = TEMPLATES[0]

export function applyFields(html: string, values: Record<string, string>): string {
  return html.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const v = values[key]
    return v === undefined ? '' : v
  })
}

export function defaultFieldValues(template: Template): Record<string, string> {
  const out: Record<string, string> = {}
  for (const f of template.fields ?? []) out[f.key] = f.default
  return out
}
