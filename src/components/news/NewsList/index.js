import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  selectCurrentNewsItems,
  selectCurrentPage,
  selectCurrentTotal,
  selectIsLoadingNews,
  getNewsAsync,
} from '../../../ducks/news';
import NewsList from './component';

const mapStateToProps = (state) => ({
  currentNewsItems: selectCurrentNewsItems(state),
  currentPage: selectCurrentPage(state),
  currentTotal: selectCurrentTotal(state),
  isLoadingNews: selectIsLoadingNews(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getNewsAsync,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
