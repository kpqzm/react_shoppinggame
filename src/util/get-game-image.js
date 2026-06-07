// 이미지 import
import img1 from "./../assets/1_LoL_S.png";
import img2 from "./../assets/2_CookieRunKingdom_S.png";
import img3 from "./../assets/3_SplitFiction_S.png";
import img4 from "./../assets/4_OverWatch2_S.png";
import img5 from "./../assets/5_PummelParty_S.png";
import img6 from "./../assets/6_EscapeSimulator_S.png";
import img7 from "./../assets/7_Astroneer_S.png";
import img8 from "./../assets/8_Unrailed_S.png";
import img9 from "./../assets/9_UltimateChickenHorse_S.png";
import img10 from "./../assets/10_Sanabi_S.png";
import img11 from "./../assets/11_TheCrew2_S.png";
import img12 from "./../assets/12_DeadByDayligt_S.png";
// 13번 없음
import img14 from "./../assets/14_TheForest_S.png";
import img15 from "./../assets/15_GTA5_S.png";
import img16 from "./../assets/16_GreenHell_S.png";
import img17 from "./../assets/17_HumanFallflat_S.png";
import img18 from "./../assets/18_ItTakesTwo_S.png";
import img19 from "./../assets/19_LethalCompany_S.png";
import img20 from "./../assets/20_Phasmophobia_S.png";
import img21 from "./../assets/21_PUBGBattelgrounds_S.png";
// 22번 없음
import img23 from "./../assets/23_Rust_S.png";
import img24 from "./../assets/24_StardewValley_S.png";
import img25 from "./../assets/25_AWayOut_S.png";
import img26 from "./../assets/26_MapleStroy_S.png";
import img27 from "./../assets/27_CookierunToA_S.png";
import img28 from "./../assets/28_TrickyTowers_S.png";
// 29번 없음
import img30 from "./../assets/30_DeathsDoor_S.png";

// ID에 따라 이미지 반환
export function getGameImage(gameId) {
  switch (gameId) {
    case 1: return img1;
    case 2: return img2;
    case 3: return img3;
    case 4: return img4;
    case 5: return img5;
    case 6: return img6;
    case 7: return img7;
    case 8: return img8;
    case 9: return img9;
    case 10: return img10;
    case 11: return img11;
    case 12: return img12;
    case 14: return img14;
    case 15: return img15;
    case 16: return img16;
    case 17: return img17;
    case 18: return img18;
    case 19: return img19;
    case 20: return img20;
    case 21: return img21;
    case 23: return img23;
    case 24: return img24;
    case 25: return img25;
    case 26: return img26;
    case 27: return img27;
    case 28: return img28;
    case 30: return img30;
    default: return null;
  }
}
