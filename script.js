//your JS code here. If required.
//your code here

        // Array to store image URLs
        const imageUrls = ["url1.jpg", "url2.jpg", "url3.jpg", "url4.jpg", "url5.jpg"];
        
        // Shuffle the image URLs
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        shuffleArray(imageUrls);

        // Add images to the image containers
        const imageElements = document.querySelectorAll('.image-container img');
        for (let i = 0; i < imageElements.length; i++) {
            imageElements[i].src = imageUrls[i];
        }

        let selectedImages = [];
        let state = 1;

        // Add click event listeners to images
        imageElements.forEach((img, index) => {
            img.addEventListener('click', () => {
                if (state === 1) {
                    state = 2;
                    document.getElementById('reset').style.display = 'block';
                }
                if (state === 3) {
                    return;
                }
                if (selectedImages.length < 2) {
                    selectedImages.push({ element: img, index });
                    img.classList.add('selected');
                }
                if (selectedImages.length === 2) {
                    state = 3;
                    document.getElementById('verify').style.display = 'block';
                }
            });
        });

        // Add click event listener to Reset button
        document.getElementById('reset').addEventListener('click', () => {
            selectedImages.forEach(selected => {
                selected.element.classList.remove('selected');
            });
            selectedImages = [];
            state = 1;
            document.getElementById('reset').style.display = 'none';
            document.getElementById('verify').style.display = 'none';
            document.getElementById('para').textContent = '';
        });

        // Add click event listener to Verify button
        document.getElementById('verify').addEventListener('click', () => {
            if (selectedImages.length === 2) {
                if (selectedImages[0].index === selectedImages[1].index) {
                    document.getElementById('para').textContent = 'You are a human. Congratulations!';
                } else {
                    document.getElementById('para').textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
                }
                state = 4;
                document.getElementById('verify').style.display = 'none';
            }
        });
