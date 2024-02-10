const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
resetFilterBtn = document.querySelector(".reset-filter"),
chooseImgBtn = document.querySelector(".choose-img"),
saveImgBtn = document.querySelector(".save-img");

let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const loadImage = () => {
    let file = fileInput.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
    });
}

const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) opacity(${opacityValue}%) blur(${blurValue}px)`;
};



filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if(option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`
        } else if(option.id === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});

const updateFilter = () => {
    const activeFilter = document.querySelector(".filter .active");
    const selectedValue = filterSlider.value;

    // Update the filter value based on the active filter option
    switch (activeFilter.id) {
        case "brightness":
            brightness = selectedValue;
            break;
        case "saturation":
            saturation = selectedValue;
            break;
        case "inversion":
            inversion = selectedValue;
            break;
        case "grayscale":
            grayscale = selectedValue;
            break;
        case "blurs":
            blurValue = selectedValue;
            break;
        case "opacity":
            opacityValue = selectedValue;
            break;
        case "contrast":
            opacityValue = selectedValue;
            break;
    }

    // Update the filter value display
    if (activeFilter.id === "blurs") {
        filterValue.innerText = `${blurValue}px`;
    } else if (activeFilter.id === "opacity") {
        filterValue.innerText = `${opacityValue}%`;
    } else if (activeFilter.id == "contrast"){
        filterValue.innerText = `${contrastValue}%`;
    } else {
        filterValue.innerText = `${selectedValue}%`;
    }

    applyFilter();
};


rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left") {
            rotate -= 90;
        } else if(option.id === "right") {
            rotate += 90;
        } else if(option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    });
});

const resetFilter = () => {
    brightness = "100"; saturation = "100"; inversion = "0"; grayscale = "0";
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click();
    applyFilter();
}

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());

const blurButton = document.getElementById("blurs");

blurButton.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    blurButton.classList.add("active");
    filterName.innerText = "Blur";
    filterSlider.max = "10"; // Adjust the maximum blur value as needed
    filterSlider.value = blurValue;
    filterValue.innerText = `${blurValue}px`;
});

let blurValue = "0";
let opacityValue = "100";
let contrastValue = "100";

const opacityButton = document.getElementById("opacity");

opacityButton.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    opacityButton.classList.add("active");
    filterName.innerText = "Opacity";
    filterSlider.max = "100"; // Adjust the maximum opacity value as needed
    filterSlider.value = opacityValue;
    filterValue.innerText = `${opacityValue}%`;
});

const contrastButton = document.getElementById("contrast");

contrastButton.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    contrastButton.classList.add("active");
    filterName.innerText = "Contrast";
    filterSlider.max = "200"; // Adjust the maximum contrast value as needed
    filterSlider.value = contrastValue;
    filterValue.innerText = `${contrastValue}%`;
});