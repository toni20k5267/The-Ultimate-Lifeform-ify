document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('DisableButton');

    // Initialize the button text based on the current value in storage
    chrome.storage.local.get('isEnabled', function(result) {
        var isEnabled = result.isEnabled;
        if (isEnabled) {
            checkPageButton.innerText = "Disable";
        } else {
            checkPageButton.innerText = "Enable";
        }
    });

    // Update the button text when the value in storage changes
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        if (namespace === 'local' && changes.isEnabled) {
            var isEnabled = changes.isEnabled.newValue;
            if (isEnabled) {
                checkPageButton.innerText = "Disable";
            } else {
                checkPageButton.innerText = "Enable";
            }
        }
    });

    // Toggle the value in storage when the button is clicked
    checkPageButton.addEventListener('click', function() {
        chrome.storage.local.get('isEnabled', function(result) {
            var isEnabled = result.isEnabled;
            chrome.storage.local.set({ isEnabled: !isEnabled });

            // Reload YouTube
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                var tab = tabs[0];
                if (tab.url.includes('youtube.com')) {
                    chrome.tabs.reload(tab.id);
                }
            });
        });
    }, false);
}, false);