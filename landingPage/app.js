function redirectToPage() {
      const algorithm = document.getElementById('algorithm').value;
      let url = '';

      switch (algorithm) {
        case 'selection':
          url = '../sortingselection/index.html';
          break;
        case 'bubble':
          url = '../Sortingbubble/index.html';
          break;
        case 'merge':
          url = '../SortingMerge/index.html';
          break;
        case 'quick':
          url = '../SortingQuick/index.html';
          break;
        default:
          url = 'index.html';
      }

      // Redirect to the corresponding page
      window.location.href = url;
    }