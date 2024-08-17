let hunger = 50;
let fun = 50;
let health = 50;
let energy = 50;
let growth = 0;
let age = 0;
let maxAge = 100;
let currency = parseInt(localStorage.getItem('currency')) || 100;

const hungerElement = document.getElementById('hunger');
const funElement = document.getElementById('fun');
const healthElement = document.getElementById('health');
const energyElement = document.getElementById('energy');
const growthElement = document.getElementById('growth');
const ageElement = document.getElementById('age');
const currencyElement = document.getElementById('currency');
const petElement = document.getElementById('pet');
const messageBox = document.getElementById('message-box');
const messageText = document.getElementById('message-text');
const currencyDisplay = document.getElementById('currency-display');

const evolutionModal = document.getElementById('evolution-modal');
const evolutionMessage = document.getElementById('evolution-message');
const evolutionImage = document.getElementById('evolution-image');
const closeModalButton = document.getElementById('close-modal');

const happyPetImage = 'images/happy-pet.png'; // 通常のペットの表情
const sadPetImage = 'images/sad-pet.png'; // 暗い表情のペットの画像

// カメラ、サボテン、本のクリックイベント
document.getElementById('camera').addEventListener('click', () => {
    fun = Math.min(fun + 5, 100); // 楽しさが増加
    updateStatus();
    showMessage("ペットの写真を撮りました！");
});

document.getElementById('cactus').addEventListener('click', () => {
    health = Math.min(health + 10, 100); // 健康度が増加
    updateStatus();
    showMessage("サボテンに水をやりました。ペットの健康度が増加しました！");
});

document.getElementById('books').addEventListener('click', () => {
    fun = Math.min(fun + 5, 100); // 楽しさが増加
    updateStatus();
    showMessage("ペットが本を読んでいます！");
});

function showMessage(message) {
    messageText.textContent = message;
    messageBox.classList.remove('hidden');
    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 3000); // 3秒後に非表示
}

function updateCurrencyDisplay() {
    currencyDisplay.textContent = currency;
    localStorage.setItem('currency', currency);
}

updateCurrencyDisplay();

function showEvolutionModal(imageSrc, message) {
    evolutionImage.src = imageSrc;
    evolutionMessage.textContent = message;
    evolutionModal.classList.remove('hidden');
}

closeModalButton.addEventListener('click', () => {
    evolutionModal.classList.add('hidden');
    if (growth >= 120) {
        alert("おめでとう！ペットが最終進化形態に達しました。ゲームを終了します。");
        window.location.href = 'welcome.html'; // ウェルカム画面に戻るか、ゲームを終了する
    }
});

// 各ボタンの機能を追加
document.getElementById('play-button').addEventListener('click', () => {
    fun = Math.min(fun + 10, 100);
    energy = Math.max(energy - 10, 0);
    updateStatus();
    showMessage("ペットが遊んでいます！");
});

document.getElementById('feed-button').addEventListener('click', () => {
    if (currency >= 20) {
        currency -= 20;
        hunger = Math.min(hunger + 10, 100);
        health = Math.min(health + 5, 100);
        energy = Math.max(energy - 5, 0);
        updateStatus();
        showMessage("ペットが餌を食べています！");
        updateCurrencyDisplay();
    } else {
        alert("通貨が不足しています！\n1. ミニゲームでコインを集める\n2. 広告を見る\n3. 課金して購入");
    }
});

document.getElementById('bathroom-button').addEventListener('click', () => {
    energy = Math.max(energy - 5, 0);
    health = Math.min(health + 5, 100);
    updateStatus();
    showMessage("ペットがトイレを使っています！");
});

document.getElementById('sleep-button').addEventListener('click', () => {
    energy = Math.min(energy + 20, 100);
    health = Math.max(health - 5, 0);
    updateStatus();
    showMessage("ペットが眠っています！");
});

document.getElementById('shop-button').addEventListener('click', () => {
    if (currency >= 20) {
        currency -= 20;
        hunger = Math.min(hunger + 10, 100);
        fun = Math.min(fun + 10, 100);
        updateStatus();
        showMessage("ペットのためにアイテムを購入しました！");
        updateCurrencyDisplay();
    } else {
        alert("通貨が不足しています！\n1. ミニゲームでコインを集める\n2. 広告を見る\n3. 課金して購入");
    }
});

document.getElementById('minigame-button').addEventListener('click', () => {
    window.location.href = 'minigame.html';
});

document.getElementById('purchase-button').addEventListener('click', () => {
    window.location.href = 'purchase.html';
});

function convertToBar(value, maxValue) {
    const barLength = 10;
    const filledBars = Math.floor((value / maxValue) * barLength);
    const emptyBars = barLength - filledBars;
    return '■'.repeat(filledBars) + '□'.repeat(emptyBars);
}

function updatePetMood() {
    // 各ステータスが30以下の場合、暗い表情に変える
    if (hunger <= 30 || fun <= 30 || health <= 30 || energy <= 30) {
        petElement.src = sadPetImage;
    } else {
        petElement.src = happyPetImage;
    }
}

function updateStatus() {
    hungerElement.textContent = convertToBar(hunger, 100);
    funElement.textContent = convertToBar(fun, 100);
    healthElement.textContent = convertToBar(health, 100);
    energyElement.textContent = convertToBar(energy, 100);
    growthElement.textContent = convertToBar(growth, 100);
    ageElement.textContent = age;
    currencyElement.textContent = currency;

    updatePetMood(); // ペットの表情を更新

    let evolved = false;

    if (growth >= 30 && growth < 60 && petElement.src !== 'imeges/child.png') {
        petElement.src = 'imeges/child.png';
        showEvolutionModal('imeges/child.png', 'ペットが子供に進化した！');
        evolved = true;
    } else if (growth >= 60 && growth < 90 && petElement.src !== 'imeges/teen.png') {
        petElement.src = 'imeges/teen.png';
        showEvolutionModal('imeges/teen.png', 'ペットが大人に進化した！');
        evolved = true;
    } else if (growth >= 90 && growth < 120 && petElement.src !== 'imeges/adult.png') {
        petElement.src = 'imeges/adult.png';
        showEvolutionModal('imeges/adult.png', 'ペットがさらに進化した！');
        evolved = true;
    } else if (growth >= 120 && petElement.src !== 'images/final.png') {
        petElement.src = 'images/final.png';
        showEvolutionModal('images/final.png', 'ペットが最終進化に達した！');
        evolved = true;
    }

    growth += 5;
    age += 1;

    if (age >= maxAge) {
        showMessage("ペットが寿命を迎えました。");
        setTimeout(() => {
            window.location.href = 'death.html';
        }, 3000);
    }
}

// 5秒ごとにステータスを減少させる（減少量も調整）
setInterval(() => {
    hunger = Math.max(hunger - 2, 0); // 減少量を減らす
    fun = Math.max(fun - 2, 0); // 減少量を減らす
    health = Math.max(health - 1, 0); // 減少量を減らす
    energy = Math.max(energy - 1, 0); // 減少量を減らす

    if (hunger === 0 || fun === 0 || health === 0 || energy === 0) {
        showMessage("ペットが死んでしまいました！");
        setTimeout(() => {
            window.location.href = 'death.html';
        }, 3000);
    }

    updateStatus();
}, 5000); // 減少間隔を5秒に変更
