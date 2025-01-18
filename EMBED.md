# Embedding YeastWise

To embed YeastWise in your website, use the following iframe code:

```html
<iframe 
  src="https://[your-github-username].github.io/yeastwise/" 
  width="100%" 
  height="600px" 
  style="border: 1px solid #eaeaea; border-radius: 8px;" 
  title="YeastWise Converter">
</iframe>
```

Replace `[your-github-username]` with your actual GitHub username after deployment.

## Responsive Embedding

For responsive embedding, wrap the iframe in a container:

```html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe 
    src="https://[your-github-username].github.io/yeastwise/" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 1px solid #eaeaea; border-radius: 8px;"
    title="YeastWise Converter">
  </iframe>
</div>
```

This will maintain a 16:9 aspect ratio and ensure the converter looks great on all devices.