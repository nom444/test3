// app.js

// 必要なDOM要素を取得
const amountInput = document.getElementById("amount");
const transactionType = document.getElementById("transaction-type");
const addTransactionButton = document.getElementById("add-transaction");
const transactionList = document.getElementById("transaction-list");
const totalAmountElement = document.getElementById("total-amount");

let totalAmount = 0;  // 合計金額
let transactions = [];  // 取引履歴

// 取引を追加する関数
function addTransaction() {
    const amount = parseFloat(amountInput.value);
    const type = transactionType.value;

    if (isNaN(amount) || amount <= 0) {
        alert("有効な金額を入力してください");
        return;
    }

    // 取引を配列に追加
    const transaction = {
        id: new Date().getTime(),
        amount: amount,
        type: type
    };
    transactions.push(transaction);

    // 合計金額を更新
    if (type === "income") {
        totalAmount += amount;
    } else if (type === "expense") {
        totalAmount -= amount;
    }

    // 取引履歴を表示
    updateTransactionList();
    updateTotalAmount();

    // 入力フィールドをクリア
    amountInput.value = "";
}

// 取引履歴を更新する関数
function updateTransactionList() {
    transactionList.innerHTML = "";  // 一度リストを空にする

    // 各取引をリストに追加
    transactions.forEach(transaction => {
        const li = document.createElement("li");
        li.innerHTML = `${transaction.type === "income" ? "収入" : "支出"}: ¥${transaction.amount}`;
        transactionList.appendChild(li);
    });
}

// 合計金額を更新する関数
function updateTotalAmount() {
    totalAmountElement.textContent = `¥${totalAmount}`;
}

// 追加ボタンにクリックイベントを設定
addTransactionButton.addEventListener("click", addTransaction);
