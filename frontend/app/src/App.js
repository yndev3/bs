// importing MyRouts where we located all of our theme
import MyRouts from './routers/routes';
import { RecoilRoot } from 'recoil';

export default function App() {
  return (
      <div>
        <RecoilRoot>
          <MyRouts/>
        </RecoilRoot>
      </div>
  );
}
