// js
$(document).ready(function() {
  var app = {}
  app.query = 'guatanamo'
  app.apiUrl = 'http://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=' + encodeURIComponent(app.query) + '&callback=?&sroffset=0'
ato
  app.resultsBox = {
    'resultsHeader': $('#results-header'),
    'results': $('#results'),
    'resultsFooter': $('#results-footer')
  }

  app.getResults(app.apiUrl, app.resultsBox, app.getResults)
  
  app.getResults = function(url, resultsBox, getResults) {
    var rb = resultsBox;
    $.getJSON(url, function(json) {

      // console.log(json)
      var header = '<h5>Search results</h5>'
      var hits = '<p class="small">Around ' + json.query.searchinfo.totalhits + ' entries</p>'
      rb.resultsHeader.html('').append(header).append(hits)
      
      var entries = json.query.search
      var pageUrl, title, pageLink, snippet, otherInfo;
      entries.forEach(function(entry) {
        pageUrl = 'https://en.wikipedia.org/wiki/' + entry.title
        title = '<span class="entry-title"><a href="' + pageUrl + '">' + entry.title + '</a></span>'
        pageLink= '<br><span class="url small">' + pageUrl + '</span>'
        snippet = '<br><span>' + entry.snippet + '</span>'
        otherInfo = '<br><span class="other-info small">' + Math.round(entry.size / 1000) + ' KB'
        otherInfo += ' - Las modified: ' + new Date(entry.timestamp).toString("yyyy-MM-dd hh:mm tt") + '</span>'
        rb.results.append($('<div>')
                          .append(title)
                          .append(pageLink)
                          .append(snippet)
                          .append(otherInfo)
                          .append('<hr class="divisor">')
                         )
      })

      var showMore = '<a id="show-more" class="btn" href="#">show more</a>'
      var noMoreResults = '<p class="text-center">No more results</p>'
      if (json.continue) {
        rb.resultsFooter.html('').append(showMore)
      }
      else {
        rb.resultsFooter.html('').append(noMoreResults)
      }      
      
      // update the url offset number
      url = url.substring(0, url.lastIndexOf('=') + 1) + json.continue.sroffset

      var pageDivisor = '<p class="text-center small text-muted">new page</p><hr class="divisor">'
      $('#show-more').on('click', function(event) {
        event.preventDefault()
        rb.results.append(pageDivisor)
        getResults(url, rb, getResults)
      })
    })
  }

  
})