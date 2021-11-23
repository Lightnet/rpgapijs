/*
# License: 
- MIT (codes)
- Multiple Licenses ( Contents, Assets, Images, Models and etc...)
# Created By: Lightnet
*/

import AuthAccess from '../components/system/authaccess';
import { GameProvider } from '../components/game/gameprovider';
import Game from "../components/game/index";
export default function GamePage() {

  return (<>
    <AuthAccess>
      <GameProvider>
        <Game></Game>
      </GameProvider>
    </AuthAccess>
  </>)
}