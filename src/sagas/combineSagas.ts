import { all } from 'redux-saga/effects';
import jobSagaModules from './jobSagaModules';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  // task들은 병렬 실행됨.
  // takeEvery 모든 액션시마다 실행 된다(GET 메소드에 활용)
  // takeLatest 액션 호출시에 같은 액션이 실행 중이면 그 액션은 파기되고 마지막 호출만 실행된다. (POST, PUT, DELETE)
  yield all([
    ...jobSagaModules,
  ]);
}
