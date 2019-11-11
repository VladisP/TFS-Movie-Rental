//App
import { createModel } from './app/createModel.js';
import { createViewModel } from './app/createViewModel.js';
import { createView } from './app/createView.js';

//Components
import './components/movieCard.js';

const model = createModel();
const view = createView();
const viewModel = createViewModel(model);

// ViewModel -> View
viewModel.bindCount(view.renderCount);
viewModel.bindError(view.renderError);
viewModel.bindResults(view.renderList);

// View -> ViewModel
view.onSearchSubmit(viewModel.handleSearchSubmit);
