import React from 'react';
import $$ from 'image2d';

export default class Xhtml extends React.Component {
    componentDidMount() {
        // 格式化代码
        prettyPrint();

        let lis = document.getElementById('api-nav').getElementsByTagName('li');
        for (let i = 0; i < lis.length; i++) {
            lis[i].setAttribute('active', 'no');
        }

        // 修改菜单状态
        $$('.apimenu-item').attr('active', 'no');
        $$('#xhtml').attr('active', 'yes');

         // 更新导航菜单信息
         window.image2d_docs_api_navHelper = {
            "small": [],
            "little": [],
            "type":"xhtml"
        };

        let smallTitles = $$('.title.small');
        let littleTitles = $$('.title.little');

        for (let i = 0; i < smallTitles.length; i++) {
            window.image2d_docs_api_navHelper.small[i] = {
                "top": smallTitles[i].offsetTop
            };
        }

        for (let i = 0; i < littleTitles.length; i++) {
            window.image2d_docs_api_navHelper.little[i] = {
                "top": littleTitles[i].offsetTop
            };
        }
    }
    render() {
        return (<div className='container'>
            <p>
                为了绘图的方便，我们提供了最基本的结点相关操作。因为这些操作是为了绘图而开发的，可能和纯粹的结点操作方法在设计上有所不同，请知悉。
        </p>

            <h4 className="title small">结点对象</h4>
            <p>
                所有的结点操作都是由结点对象提供的，因此，我们首先来看看如何创建一个结点对象：
        </p>
            <pre className='prettyprint lang-js'>var imageObject=$$(selector[, context]);</pre>
            <p>
                如上所示，通过执行$$或image2D方法即可获取一个结点对象，我们可以传递二个参数来确定当前结点对象维护的结点是哪些。
        </p>
            <p className="warn">
                结点对象维护了一些结点，调用结点对象上的方法，就是对维护的这些结点进行操作。
        </p>
            <p>
                第一个参数selector（称为选择器）是必须的，用以确定当前维护的结点是哪些。
        </p>
            <p>
                第二个参数context是可选的，默认选择器在全局查找，你也可以通过传递一个dom结点指定查找上下文（id选择器会忽略此参数直接在全局查找）。
        </p>

            <h6 className="title little">选择器</h6>
            <p>
                任何合法的选择器都应该是下列中的某一种：
        </p>
            <ul>
                <li>模板字符串（除canvas外，生成的默认都是svg标签），比如'&lt;g&gt;'、'&lt;canvas&gt;非常抱歉，您的浏览器不支持canvas!&lt;/canvas&gt;'等。</li>
                <li>ID选择器，比如'#demo'会选中id是'demo'的第一个标签。</li>
                <li>class和标签选择器，比如'.cls'、'div'、'div.cls'和'g.info.warn'等。</li>
                <li>全部选择器，也就是字符串'*'，会选中全部结点。</li>
                <li>非查询选择器，包括：结点，结点数组和结点对象。这类选择器不会进行查找，直接把传递的结点作为维护结点，因此也会忽略查找上下文。</li>
                <li>筛选函数，传递一个函数，函数形参是当前面对的结点，通过返回true或false来判断是否把当前面对的结点加入结点对象中。</li>
            </ul>

            <p>
                创建好了结点对象以后，后续依旧可以对维护的结点进行筛选后获取新的结点对象：
        </p>
            <pre className='prettyprint lang-js'>var new_imageObject=imageObject.filter(filterback);</pre>
            <p>
                返回新的结点对象，不会修改原来的结点对象。其中filterback叫做筛选函数，有二个形参，分别是当前面对结点序号和维护了当前面对结点的结点对象，通过返回true或false来判断是否把当前面对的结点加入新创建的结点对象中。
        </p>

            <p className="warn">
                特别注意：第二个参数context除了可以是dom结点外，还有二个特殊的字符串可以作为参数"html"（或"HTML"）和"svg"（或"SVG"），如果传递这二个字符串中的某个，表示把第一个参数selector作为模板字符串生成新的结点（前者生成html结点，后者生成svg结点）。
        </p>

            <h4 className="title small">编辑</h4>

            <p>
                把当前维护的结点加到目标结点内部的结尾：
        </p>
            <pre className='prettyprint lang-js'>imageObject.appendTo(target[, context]);</pre>
            <p className="warn">
                target是一个合法的选择器即可，context是一个结点（当然，额外有二个字符串"html"和"svg"可以作为参数，和上面一样），表示目标结点查找上下文，可选，默认全局查找，下同。
        </p>

            <p>
                把当前维护的结点加到目标结点内部的开头：
        </p>
            <pre className='prettyprint lang-js'>imageObject.prependTo(target[, context]);</pre>

            <p>
                把当前维护的结点加到目标结点之后：
        </p>
            <pre className='prettyprint lang-js'>imageObject.afterTo(target[, context]);</pre>

            <p>
                把当前维护的结点加到目标结点之前：
        </p>
            <pre className='prettyprint lang-js'>imageObject.beforeTo(target[, context]);</pre>

            <p>
                从页面中删除当前维护的结点：
        </p>
            <pre className='prettyprint lang-js'>imageObject.remove();</pre>

            <p>
                设置或获取结点中的文本：
        </p>
            <pre className='prettyprint lang-js'>imageObject.text([content]);</pre>

            <h4 className="title small">样式和属性</h4>

            <p>
                修改或获取结点样式：
        </p>
            <pre className='prettyprint lang-js'>imageObject.css();</pre>
            <p>
                通过不同的参数来确定是获取样式还是设置样式，具体有下列参数选项可选：
        </p>
            <ul>
                <li>(key):获取指定样式。</li>
                <li>(key,value):设置指定样式。</li>
                <li>():获取全部样式。</li>
                <li>(json):设置大量样式。</li>
            </ul>

            <p>
                设置或获取结点属性：
        </p>
            <pre className='prettyprint lang-js'>imageObject.attr();</pre>
            <p>
                和样式css方法类似，也是通过具体参数来确定是获取还是设置样式：
        </p>
            <ul>
                <li>(attr):获取属性。</li>
                <li>(attr,value):设置指定属性值。</li>
                <li>(json):设置大量属性。</li>
            </ul>

            <h4 className="title small">事件相关</h4>

            <p>
                给维护的结点绑定事件：
        </p>
            <pre className='prettyprint lang-js'>imageObject.bind(eventType, callback);</pre>

            <p>
                获取鼠标相对当前维护的元素左上角位置：
        </p>
            <pre className='prettyprint lang-js'>imageObject.position(event);</pre>

            <h4 className="title small">数据绑定</h4>
            <p>
                绘图就离不开数据，把数据和结点关联起来，会简化结点管理和数据保存问题，这里涉及四个核心方法：data、datum、enter和exit，还有一些相关方法（因为结点对象的各个方法之间不完全是独立的）。
        </p>

            <p>
                把数据绑定到一组结点或返回第一个结点数据：
        </p>
            <pre className='prettyprint lang-js'>imageObject.datum();</pre>
            <p>
                通过具体的参数来判断是获取还是绑定，有下列参数选项可选：
        </p>
            <ul>
                <li>():不带任何参数表示获取数据。</li>
                <li>(data):带一个参数表示设置结点对象维护的全部结点数据为data。</li>
                <li>(data, calcback):和带一个参数类似，只不过绑定的数据是经过calcback函数重新计算后返回的值，该函数有二个形参：data和index。</li>
            </ul>

            <p>
                把一组数据绑定到一组结点或返回一组结点数据：
        </p>
            <pre className='prettyprint lang-js'>var update=imageObject.data();</pre>
            <p>
                和上面的datum方法类似，只不过这是对一组数据进行操作，也就是data变成了数组datas，不再赘述了。
        </p>

            <img src={require('../../assets/enter_exit.png')} style={{ float: 'right', backgroundColor: '#fff' }} width='400' />

            <p>
                不过，你可能已经注意到了，data方法因为操作的是数组，数组个数和维护的结点个数不一定一样多，这样就存在平衡问题。
        </p>
            <p>
                如右图所示，我们把数据和结点匹配的部分称为update（刚刚好平衡，已经更新好了的意思），数据多于结点的部分称为enter（因为绘图是根据数据来的，数据多了，应该添加结点来维持平衡），结点多于数据的部分称为exit（多余的结点删除即可）。
        </p>

            <pre className='prettyprint lang-js'>var enter=update.enter(template[, type]);</pre>
            <p>
                如果数据多于结点，调用enter方法，传递一个参数template（模板字符串，类似'&lt;path&gt;'、'text'等）来把多余的数据绑定到新建立的结点上去，后续通过之前的常规结点操作追加到页面的合适位置去即可。
        </p>
            <p>
                第二个参数type可选，表示第一个参数生成的结点类型，默认'svg'，表示生成svg结点，或者传递字符串'html'表示生成html结点。
        </p>

            <pre className='prettyprint lang-js'>var exit=update.exit();</pre>
            <p>
                如果结点多于数据，调用exit方法获取多余的结点，然后再调用remove方法删除即可。
        </p>

            <p>
                通过上面的四个主要方法，可以把数据和结点绑定起来，接下来需要思考的是如何把数据的绘图方法作用到具体的结点上去：
        </p>
            <pre className='prettyprint lang-js'>{`imageObject.loop(function(data,index,target){
    // 绘制图像
    // data是当前结点对象target维护的数据，index是当前结点对象序号
});`}</pre>
            <p>
                loop方法会把传递的绘图方法在当前结点对象维护的每一个结点上应用一次，具体的绘图方法可以根据当前面对的结点绑定的数据来绘制。
        </p>
        </div>);
    }
};
