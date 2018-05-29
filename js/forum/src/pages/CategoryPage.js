import Page from 'flarum/components/Page';
import PrimaryTagView from 'reflar/koseki/components/PrimaryTagView';
import sortTags from 'flarum/tags/utils/sortTags';
import IndexPage from 'flarum/components/IndexPage';
import listItems from 'flarum/helpers/listItems';
import ChildTagView from 'reflar/koseki/components/ChildTagView';

export default class CategoryPage extends Page {
    init() {
        super.init();

        this.tags = sortTags(app.store.all('tags').filter(tag => tag.isChild() == false));
        this.secondary = sortTags(app.store.all('tags').filter(tag => tag.hasChild() == false && tag.isChild() == false));
    }


    view() {
        return (
            <div className="KosekiPage">
                { IndexPage.prototype.hero() }

                <div className="container">
                    <nav className="KosekiPage-nav IndexPage-nav sideNav" config={ IndexPage.prototype.affixSidebar }>
                        <ul>{ listItems(IndexPage.prototype.sidebarItems().toArray()) }</ul>
                    </nav>

                    <div className="KosekiPage-content">
                        <div className="KosekiPage--categories TagTiles">
                            { this.tags.map(tag => PrimaryTagView.component({tag})) }

                            { this.secondary.length >= 1 ? (
                            <div className="TagTile-info">
                                <div class="TagTile-title">{ app.translator.trans('reflar-koseki.forum.forums') }</div>
                                <div class="TagTile-stats">{ app.translator.trans('reflar-koseki.forum.statistics') }</div>
                                <div class="TagTile-last">{ app.translator.trans('reflar-koseki.forum.last_post') }
                                </div>
                            </div>) : ''}

                             { this.secondary.map(tag => ChildTagView.component({tag})) }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
