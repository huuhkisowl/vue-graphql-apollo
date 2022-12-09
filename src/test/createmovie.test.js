/**
 * @vitest-environment happy-dom
 */

 import { mount } from "@vue/test-utils"
 import Create from '../components/Create.vue'
 import { describe, expect, test } from "vitest";

 describe("Create.vue", () => {
    test("Testing with button", () => {
        const wrapper = mount(Create)

        // trigger the element
        wrapper.find('span.v-btn__content').trigger('click')

        // assert some action has been performed, like an emitted event.
        expect(wrapper.emitted()).toHaveProperty('submit')
    });
});