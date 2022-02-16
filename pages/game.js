/*
# License: 
- MIT (codes)
- Multiple Licenses ( Contents, Assets, Images, Models and etc...)
# Created By: Lightnet
*/

import AuthAccess from '../components/system/authaccess';
import { GameProvider } from '../components/game/gameprovider.js';
import GameContent from "../components/game/gamecontent.js";
export default function GamePage() {

  return (<>
    <AuthAccess>
      <GameProvider>
        <GameContent />
      </GameProvider>
    </AuthAccess>
  </>)
}