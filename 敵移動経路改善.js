/*--------------------------------------------------------------------------
　敵移動経路改善 ver 1.0

■作成者
キュウブ

■概要
敵が意味のなく遠回りして攻撃する事がなくなります

具体的にはメリット無しで
既に隣接している状態なのに別の方向から隣接し直して攻撃したりとか
ユニットの右側に隣接した方が近いのにわざわざ遠回りして上側に隣接する
といった事がなくなります

■更新履歴
ver 1.0 (2017/10/01)
公開 

■対応バージョン
SRPG Studio Version:1.153

■規約
・利用はSRPG Studioを使ったゲームに限ります。
・商用・非商用問いません。フリーです。
・加工等、問題ありません。
・クレジット明記無し　OK (明記する場合は"キュウブ"でお願いします)
・再配布、転載　OK (バグなどがあったら修正できる方はご自身で修正版を配布してもらっても構いません)
・wiki掲載　OK
・SRPG Studio利用規約は遵守してください。

--------------------------------------------------------------------------*/

(function(){
	
	CombinationSelector._getBestCostIndex = function(unit, combination) {
		var i, count, totalScore, costData, limitMove;
		var scoreArray = [];

		this._scorerArray = [];
		this._configureScorerSecond(this._scorerArray);

		count = combination.costArray.length;
		for (i = 0; i < count; i++) {
			// _getTotalScoreの内部処理のため、位置と消費移動力を一時的に設定する
			costData = combination.costArray[i];
			combination.posIndex = costData.posIndex;
			combination.movePoint = costData.movePoint;

			var totalScore = {
				score: this._getTotalScore(unit, combination),
				movePoint: combination.movePoint
			};

			scoreArray.push(totalScore);
		}

		return this._getBestIndexFromScoreExtendPosition(scoreArray);
	};

	CombinationSelector._getBestIndexFromScoreExtendPosition = function(scoreArray) {
		var i;
		var max = -1;
		var index = -1;
		var movePoint = 10000;
		var count = scoreArray.length;

		for (i = 0; i < count; i++) {
			if (scoreArray[i].score > max) {
				max = scoreArray[i].score;
				index = i;
				movePoint = scoreArray[i].movePoint;
			} else if (scoreArray[i].score === max && movePoint > scoreArray[i].movePoint) {
				index = i;
				movePoint = scoreArray[i].movePoint;
			}
		}

		return index;
	};
	
})();