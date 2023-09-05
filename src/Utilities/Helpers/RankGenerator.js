import firstPlaceIconPath from '../SVG/first-place.svg';
import secondPlaceIconPath from '../SVG/second-place.svg';
import thirdPlaceIconPath from '../SVG/third-place.svg';

export default function RankLogoGenerator(rank) {
  const rankObject = {
    1: firstPlaceIconPath,
    2: secondPlaceIconPath,
    3: thirdPlaceIconPath
  }
  const style = {
    width: '20px',
    height: '20px',
  }
  switch (rank) {
    case 1:
      return <img style={style} src={rankObject[rank]} alt="1"></img>;
    case 2:
      return <img style={style} src={rankObject[rank]} alt="2"></img>;
    case 3:
      return <img style={style} src={rankObject[rank]} alt="3"></img>;
    default:
      return rank;
  }
}