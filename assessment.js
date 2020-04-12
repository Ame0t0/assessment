'use strict'              //宣言後のミスをエラーとして表示してくれる機能を呼び出す。
const userNameInput =document.getElementById('user-name');
const assessmentButton =document.getElementById('assessment');
const resultDivided =document.getElementById('result-area');
const tweetDivided =document.getElementById('tweet-area');

/**
 * 指定した要素の子供をすべて削除する
 * @param{HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
    while (element.firstChild){   //子供の要素がある限り
        element.removeChild(element.firstChild); //子供の要素を削除してから次の処理へすすむ。
    }
}

assessmentButton.onclick = () => {　      //function(){を省略した表記(アロー関数)
    console.log('ボタンが押されました');
    const userName =userNameInput.value;  //名前を受け取る。
    if (userName.length ===0){return;}    //名前が空の時は処理を終了する。
    console.log(userName);
    
    //診断結果表示エリア↓
    removeAllChildren(resultDivided);
    const header =document.createElement('h3');
    header.innerText ='診断結果';
    resultDivided.appendChild(header);

    const paragraph =document.createElement('p');
    const result =assessment(userName);
    paragraph.innerText =result;
    resultDivided.appendChild(paragraph);
    
    //ツイートエリア↓
    removeAllChildren(tweetDivided);
    const anchor =document.createElement('a');
    const hrefValue ='https://twitter.com/intent/tweet?button_hashtag='
                    + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);   //href属性として、hrefValueに入っているものを追加する。
    anchor.className ='twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText ='tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    //widgets.js（ツイッターさん提供の画像っぽいのでリンク表示されるやつを自分のHPで使えるようにする）設定↓
    const script =document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');  //src属性として、https://～を追加する。
    tweetDivided.appendChild(script);
};

userNameInput.onkeydown =(event)=>{
    if(event.key === 'Enter'){
        //TDボタンのonclick()
        assessmentButton.onclick();
    }
};

const answers =[
    '{userName}さんのいいところは声です。{userName}さんの特徴的な声は皆を惹きつけます。',
    '{userName}さんのいいところはまなざしです。{userName}さんに見つめられた人は気になって仕方がないでしょう。',
    '{userName}さんのいいところは情熱で。{userName}さんの情熱に周りの人は感化されます。',
    '{userName}さんのいいところは厳しさです。{userName}さんの厳しさが物事をいつも成功に導きます。',
    '{userName}さんのいいところは知識です。博識な{userName}さんを多くの人が頼りにしています。',
    '{userName}さんのいいところはユニークさです。{userName}さんだけのその特徴が皆を楽しくさせます。',
    '{userName}さんのいいところは用心深さです。{userName}さんの洞察に多くの人が助けられます。',
    '{userName}さんのいいところは見た目です。内側からあふれ出る{userName}さんの良さに皆が気を引かれます。',
    '{userName}さんのいいところは決断力です。{userName}さんがする決断にいつも助けられる人がいます。',
    '{userName}さんのいいところは思いやりです。{userName}さんに気をかけてもらった多くの人が感謝しています。'
    '{userName}さんのいいところは優しさです。{userName}さんの優しい雰囲気や立ち振る舞いに多くの人が癒されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string} userName　ユーザーの名前
 * @return{string} 診断結果
 */
function assessment(userName){
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode =0;
    for (let i=0; i<userName.length; i++){
        sumOfCharCode =sumOfCharCode+userName.charCodeAt(i);
    }

    //全文字コード番号の合計を、回答の数で割って添字の数値を求める
    const index =sumOfCharCode % answers.length;
    let result =answers[index];

    result= result.replace(/\{userName\}/g, userName);
    return result;
}

//テストコード（上の行と一致してればOK。してなければコンソールに下の行が表示される）
console.assert(
    assessment('太郎') === '太郎さんのいいところは用心深さです。次郎さんの洞察に多くの人が助けられます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
