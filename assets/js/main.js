document.addEventListener('DOMContentLoaded', () => {
    const monthSelect = document.getElementById('birthMonth');
    const daySelect = document.getElementById('birthDay');
    const checkButton = document.getElementById('checkButton');
    const resultArea = document.getElementById('result-area');

    // --- 月と日の選択肢を生成する処理 ---
    
    // 月の選択肢（1〜12月）を生成
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i}月`;
        monthSelect.appendChild(option);
    }
    
    // 日の選択肢の初期状態（1〜31日）を生成
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i}日`;
        daySelect.appendChild(option);
    }

    // --- 月が変更されたら、日の選択肢を更新する関数 ---
    const updateDays = () => {
        const selectedMonth = parseInt(monthSelect.value, 10);
        const currentDay = daySelect.value; // 現在選択されている日を保持

        // 日の選択肢を一旦クリア（「日」の項目は残す）
        while (daySelect.options.length > 1) {
            daySelect.remove(1);
        }

        let daysInMonth;
        if ([4, 6, 9, 11].includes(selectedMonth)) {
            daysInMonth = 30;
        } else if (selectedMonth === 2) {
            daysInMonth = 29; // うるう年は無視して29日に固定
        } else {
            daysInMonth = 31;
        }
        
        // 月が選択されていない場合は31日にしておく
        if (!selectedMonth) {
            daysInMonth = 31;
        }

        // 新しい日の選択肢を生成
        for (let i = 1; i <= daysInMonth; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${i}日`;
            daySelect.appendChild(option);
        }

        // もし以前選択していた日が新しい日数内にあれば、それを再選択する
        if (currentDay && currentDay <= daysInMonth) {
            daySelect.value = currentDay;
        }
    };

    // 月のプルダウンが変更されたらupdateDays関数を実行
    monthSelect.addEventListener('change', updateDays);


    // --- 「占う」ボタンがクリックされたときの処理 ---
    console.log(cakeWordsData, Array.isArray(cakeWordsData));
    checkButton.addEventListener('click', () => {
        const birthMonth = parseInt(monthSelect.value, 10);
        const birthDay = parseInt(daySelect.value, 10);

        if (!birthMonth || !birthDay) {
            alert('月と日、両方を選んでください！');
            return;
        }
        console.log(birthMonth, birthDay);

        // cakeWordsDataはbaseof.htmlでHugoから渡されたJSONデータ
        const resultData = cakeWordsData.find(item =>
            item.month === birthMonth &&
            item.day   === birthDay
        );
        console.log(resultData);
        if (!resultData) {
            alert('該当するデータが見つかりませんでした。');
            return;
        }

        if (resultData) {
            resultArea.innerHTML = `
                <p>${birthMonth}月${birthDay}日生まれのあなたへ</p>
                <h2>${resultData.cakeName}</h2>
                <p class="cake-word">「${resultData.cakeWord}」</p>
                <p>${resultData.description}</p>
            `;
            resultArea.classList.add('show');
        } else {
             resultArea.innerHTML = `<p>あれれ？データが見つからないみたいです。</p>`;
             resultArea.classList.add('show');
        }
    });

    // 初期読み込み時にも日の選択肢を更新しておく（念のため）
    updateDays();
});