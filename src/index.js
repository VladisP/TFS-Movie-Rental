//App
import { viewModel } from './app/createViewModel.js';
import { view } from './app/createView.js';

//Components
import './components/movieCard.js';
import './components/searchTag.js';

// ViewModel -> View
viewModel.bindCount(view.renderCount);
viewModel.bindError(view.renderError);
viewModel.bindResults(view.renderList);
viewModel.bindSearches(view.renderSearchHistoryList);
viewModel.bindLoading(view.renderLoader);

// View -> ViewModel
view.onSearchSubmit(viewModel.handleSearchSubmit);
view.onTagClick(viewModel.handleTagClick);
view.onTagRemove(viewModel.handleTagRemove);

// Init app
viewModel.init();
