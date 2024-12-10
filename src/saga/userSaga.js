import { put, takeEvery, call } from 'redux-saga/effects';
import { FETCH_USERS, setUsers } from '../store/customerReduser';

const fetchUsersFromApi = () =>
    fetch('https://jsonplaceholder.typicode.com/users?_limit=10');

function* fetchUsersWorker() {
    try {
        const response = yield call(fetchUsersFromApi);
        const data = yield response.json();
        yield put(setUsers(data));
    } catch (error) {
        console.error('Ошибка загрузки пользователей:', error);
    }
}

export function* fetchUsersWatcher() {
    yield takeEvery(FETCH_USERS, fetchUsersWorker);
}
