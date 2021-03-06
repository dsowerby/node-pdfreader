var PDFReader = require('../index').PDFReader;

function errorDumper(err) {
  if (err) {
    console.log('something went wrong :/');
    throw err;
  }
}

var pdf = new PDFReader(__dirname + '/trace.pdf');
pdf.on('error', errorDumper);
pdf.on('ready', function(pdf) {
  // Render a single page.
  pdf.render(1 /* First page */, {
    bg: true,  /* Enable white background */
    output: __dirname + '/page-single.png'
  }, errorDumper);

  // Render all pages.
  pdf.renderAll({
    output: function(pageNum) {
      return __dirname + '/page' + pageNum + '.png';
    }
  }, errorDumper);

  // Get the text content of single pages (similar to pdf2txt).
  pdf.getContent(1 /* First page */, function(err, content) {
    console.log(content);
  }, errorDumper);
});
