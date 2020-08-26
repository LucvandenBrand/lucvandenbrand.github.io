// Little piece of code that renders KaTeX for all LaTeX scripts inside the post.
const inline_tex = document.querySelectorAll("script[type='math/tex']");
inline_tex.forEach(element => {
    const tex = element.textContent;
    element.outerHTML = katex.renderToString(tex.replace(/%.*/g, ''), {displayMode: false});
});

const block_tex = document.querySelectorAll("script[type='math/tex; mode=display']");
block_tex.forEach(element => {
    const tex = element.textContent;
    element.outerHTML = katex.renderToString(tex.replace(/%.*/g, ''), {displayMode: true});
});