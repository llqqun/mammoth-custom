(function() {
  // eslint-disable-next-line no-undef
    document.getElementById('document').addEventListener('change', handleFileSelect, false);

    function handleFileSelect(event) {
        readFileInputEventAsArrayBuffer(event, function(arrayBuffer) {
          // eslint-disable-next-line no-undef
            mammoth.convertToHtml({arrayBuffer: arrayBuffer}, {ignoreEmptyParagraphs: false})
        .then(displayResult)
        .done();
        });
    }

    function displayResult(result) {
      // eslint-disable-next-line no-undef
        document.getElementById('output').innerHTML = result.value;

        var messageHtml = result.messages
      .map(function(message) {
          return '<li class="' + message.type + '">' + escapeHtml(message.message) + '</li>';
      })
      .join('');

      // eslint-disable-next-line no-undef
        document.getElementById('messages').innerHTML = '<ul>' + messageHtml + '</ul>';
    }

    function readFileInputEventAsArrayBuffer(event, callback) {
        var file = event.target.files[0];

      // eslint-disable-next-line no-undef
        var reader = new FileReader();

        reader.onload = function(loadEvent) {
            var arrayBuffer = loadEvent.target.result;
            callback(arrayBuffer);
        };

        reader.readAsArrayBuffer(file);
    }

    function escapeHtml(value) {
        return value
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    }
})();
