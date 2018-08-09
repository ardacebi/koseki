import { extend } from 'flarum/extend';
import Model from 'flarum/Model';
import addHomepageOption from 'reflar/koseki/addHomepageOption';
import EditTagModal from 'flarum/tags/components/EditTagModal';
import Tag from 'flarum/tags/models/Tag';


app.initializers.add('reflar-koseki', app => {
    addHomepageOption();

    Tag.prototype.icon = Model.attribute('icon');

    extend(EditTagModal.prototype, 'init', function () {
        this.icon = m.prop(this.tag.icon() || '');
    });

    extend(EditTagModal.prototype, 'content', function (content) {
        let self = this;

        // Add new input
        let newInput = document.createElement('div');
        newInput.classList += 'Form-group';
        newInput.innerHTML = '<label>Icon</label> <input class="FormControl" value="' + this.icon() + '">';

        // Update input value
        var formInput = newInput.querySelector('input');
        formInput.oninput = function () {
            self.icon = m.prop(formInput.value);
        }

        if (this.element) {
            var formGroups = this.element.getElementsByClassName('Form-group');

            // Add input before input 4
            formGroups[4].before(newInput);
        }
    });

    extend(EditTagModal.prototype, 'submitData', function (data) {
        data.icon = this.icon;
    });
});
