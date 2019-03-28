# 77: 7x7 のカラム地図 (TabularMaps)

# 利用者向け
## 使い方
次の URL で 7 x 7 のカラム地図を作ることができます。

```
https://tabularmaps.github.io/77/?title={題名}&prefs={}&color={}
```

- title: カラム地図の左上に書き込むタイトル
- prefs: 色を塗る都道府県のコード
- color: 都道府県に塗る色

## サンプル
- [北海道地方測量部担当地域](https://tabularmaps.github.io/77/?title=北海道地方測量部担当地域&prefs=1&color=green)
- [東北地方測量部担当地域](https://tabularmaps.github.io/77/?title=東北地方測量部担当地域&prefs=2,3,4,5,6,7&color=green)
- [関東地方測量部担当地域](https://tabularmaps.github.io/77/?title=関東地方測量部担当地域&prefs=8,9,10,11,12,13,14,19,20&color=green)
- [北陸地方測量部担当地域](https://tabularmaps.github.io/77/?title=北陸地方測量部担当地域&prefs=15,16,17,18&color=green)
- [中部地方測量部担当地域](https://tabularmaps.github.io/77/?title=中部地方測量部担当地域&prefs=21,22,23,24&color=green)
- [近畿地方測量部担当地域](https://tabularmaps.github.io/77/?title=近畿地方測量部担当地域&prefs=25,26,27,28,29,30&color=green)
- [中国地方測量部担当地域](https://tabularmaps.github.io/77/?title=中国地方測量部担当地域&prefs=31,32,33,34,35&color=green)
- [四国地方測量部担当地域](https://tabularmaps.github.io/77/?title=四国地方測量部担当地域&prefs=36,37,38,39&color=green)
- [九州地方測量部担当地域](https://tabularmaps.github.io/77/?title=九州地方測量部担当地域&prefs=40,41,42,43,44,45,46&color=green)
- [沖縄支所担当地域](https://tabularmaps.github.io/77/?title=沖縄支所担当地域&prefs=47&color=green)

# 開発者向け
## インストール
```console
git clone git@github.com:tabularmaps/77
cd 77
npm install
npm run-script build
```
試行錯誤する場合には、`npm run-script watch` も便利だと思います。

## 利用
```console
open index.html
```

## 改造するには
tabularmaps.js をいろいろ書き換えてみてください。

パブリックドメイン(Unlicense)にしていますので、ご自由にどうぞ。

# ChangeLog
- 2019-03-28: [日本の都道府県を7x7カラム地図として表現！ 測量部担当地域と八地方区分](https://fukuno.jig.jp/2434) を参考に、 board の内容を修正
