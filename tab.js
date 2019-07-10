/*
 * @Author: perfectpan 
 * @Date: 2019-07-04 10:52:29 
 * @Last Modified by: perfectpan
 * @Last Modified time: 2019-07-10 11:21:32
 */
const OPTIONS = {
    tabContainer: 'tab-container',
    tabNavbar: 'tab-navbar',
    tabNavbarActive: 'tab-navbar-active',
    tabContent: 'tab-content',
    tabContentActive: 'tab-content-active',
    activeIndex: 0
};

class Tab {
    constructor(newOptions) {
        if (Object.prototype.toString.call(newOptions) === '[object Object]') {
            Object.assign(OPTIONS, newOptions);
        } else {
            console.log('传入了非对象参数');
        }
        //展开Nodelist,添加data-id
        [...document.getElementsByClassName(OPTIONS.tabNavbar)].forEach((element, index) => {
            element.dataset.id = index;
        });
        this.activeTab(OPTIONS.activeIndex);
        this.handlers = {};
        this.initEvent();
    }

    activeTab(index) {
        let tabElements = document.getElementsByClassName(OPTIONS.tabNavbar),
            tabContents = document.getElementsByClassName(OPTIONS.tabContent),
            len = Math.min(tabElements.length, tabContents.length); // 取min是为了防止两者长度不统一的问题

        if (index < 0 || index >= len) {
            index = 0;
            console.log('下标异常，已强制设为0');
        }

        if (index !== OPTIONS.activeIndex) {
            // 撤销
            tabElements[OPTIONS.activeIndex].classList.toggle(OPTIONS.tabNavbarActive);
            tabContents[OPTIONS.activeIndex].classList.toggle(OPTIONS.tabContentActive);
            // 增加
            tabElements[index].classList.toggle(OPTIONS.tabNavbarActive);
            tabContents[index].classList.toggle(OPTIONS.tabContentActive);
            // 更新activeIndex
            OPTIONS.activeIndex = index;
            // 执行自定义事件
            this.fire({
                type: 'active',
                targetIndex: index,
                targetElement: tabElements[index],
                targetContent: tabContents[index]
            });
        }
    }

    initEvent() {
        let container = document.getElementsByClassName(OPTIONS.tabContainer),
            handler = e => {
                let event = e || window.event,
                    target = event.target || event.srcElement,
                    callback = target => {
                        if (target.classList && target.classList.contains(OPTIONS.tabNavbar)) {
                            this.activeTab(parseInt(target.dataset.id));
                            return;
                        }
                        if (target === null || target.parentNode === null) return;
                        callback(target.parentNode);
                    };
                callback(target);
            };

        [...container].forEach(element => {
            if (element.addEventListener) {
                element.addEventListener('mouseover', handler); // DOM2级
            } else if (element.attachEvent) {
                element.attachEvent('onmouseover', handler);
            } else {
                element['onmouseover'] = handler; // DOM0级
            }
        })
    }
    // 添加自定义事件
    addHandler(type, handler) {
        if (typeof this.handlers[type] === 'undefined') {
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    }
    // 执行自定义事件
    fire(event) {
        if (this.handlers[event.type] instanceof Array) {
            this.handlers[event.type].forEach(handler => {
                handler(event);
            });
        }
    }
    // 移除自定义事件
    removeHandler(type, handler) {
        if (this.handlers[type] instanceof Array) {
            let handlers = this.handlers[type];
            for (var i = 0, len = handler.length; i < len; ++i) {
                if (handlers[i] === handler) {
                    break;
                }
            }

            handlers.splice(i, 1);
        }
    }
}

export default Tab;
