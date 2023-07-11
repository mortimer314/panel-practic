
let fileInfo = null
let articleBodyEditor = null

const articleTitleElem = document.querySelector("#article-title")
const writerElem = document.querySelector("#write")
const categoryElem = document.querySelector("#category")
const fileElem = document.querySelector("#file")
const abstractElem = document.querySelector("#abstract")
const editorElem = document.querySelector("#editor")
const coverImgElem = document.querySelector(".cover-img")

const preparingForm = () => {
    fileElem.addEventListener("change", event => {
        fileInfo = event.target.files[0]
        if(fileElem.files[0]){
            coverImgElem.src =URL.createObjectURL(fileElem.files[0])
        }
    })
    creatEditor()
}

const createArticle = () => {
    testInputs()
    console.log("create")
    const formData = new FormData()
    formData.append("title", articleTitleElem.value.trim())
    // console.log(writerElem.value.trim())
    formData.append("writer", writerElem.value.trim())
    formData.append("category", categoryElem.value.trim())
    formData.append("file", fileElem.files[0])
    formData.append("abstract", abstractElem.value.trim())
    formData.append("content", articleBodyEditor.getData())
    console.log(formData)

    axios({
        method: "post",
        url: "https://site-613e5-default-rtdb.firebaseio.com/articles.json",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    })
        .then(res => {
            console.log(res)
            nameInput.value = ""
            usernameInput.value = ""
            emailInput.value = ""
            phoneInput.value = ""
            passwordInput.value = ""

            showSwal("کاربر مورد نظر با موفقیت افزوده شد.", "success", "تایید", getAndShowAllUsers())
        })
        .catch(res => {
            console.log(res)

            if (res.message === "Network Error") {
                alert("پایگاه داده در فایربیس میباشد برای دور زدن تحریم و وصل شدن لطفا از فیلتر شکن استفاده کنید.باتشکر👌")
            }
        })


}
const draftArticle = () => {
    console.log("draft")
}

const testInputs = async () => {

    let testList = []
    let invalidList = []
    let listInputs = [articleTitleElem, fileElem, abstractElem]

    let namePattern = /^.{4,}$/
    let abstractElemPattern = /^.{4,}$/

    if (!namePattern.test(articleTitleElem.value.trim())) {
        testList.push(`عنوان مقاله نباید کمتر از 4 کاراکتر باشد.`)
        invalidList.push(articleTitleElem)
    }
    if (!namePattern.test(abstractElem.value.trim())) {
        testList.push(`چکیده نباید کمتر از 25 کاراکتر باشد.`)
        invalidList.push(abstractElem)
    }

    if (!fileInfo) {
        testList.push(`داشتن کاور اجباری است.`)
        invalidList.push(fileElem)
    }


    listInputs.forEach(item => {
        item.style.border = "none"
    })
    invalidList.forEach(item => {
        item.style.border = "1px solid red"
    })
    if (testList.length) {
        Swal.fire({
            confirmButtonText: 'تایید',
            showCloseButton: true,
            title: ' لطفا موارد زیر را رعایت کنید.',
            html: `${testList.map((item, index) => {
                return `<h1 style="font-weight:bold;text-align:start;">${index + 1} - ${item}</h1>`
            }).join('')}`
        })
        return false
    }
    return true
}

const creatEditor = () => {
    CKEDITOR.ClassicEditor.create(document.getElementById("editor"), {
        language: "fa",
        // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html#extended-toolbar-configuration-format
        toolbar: {
            items: [
                'exportPDF', 'exportWord', '|',
                'findAndReplace', 'selectAll', '|',
                'heading', '|',
                'bold', 'italic', 'strikethrough', 'underline', 'code', 'subscript', 'superscript', 'removeFormat', '|',
                'bulletedList', 'numberedList', 'todoList', '|',
                'outdent', 'indent', '|',
                'undo', 'redo',
                '-',
                'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'highlight', '|',
                'alignment', '|',
                'link', 'insertImage', 'blockQuote', 'insertTable', 'mediaEmbed', 'codeBlock', 'htmlEmbed', '|',
                'specialCharacters', 'horizontalLine', 'pageBreak', '|',
                'textPartLanguage', '|',
                'sourceEditing'
            ],
            shouldNotGroupWhenFull: true
        },
        // Changing the language of the interface requires loading the language file using the <script> tag.
        // language: 'es',
        list: {
            properties: {
                styles: true,
                startIndex: true,
                reversed: true
            }
        },
        // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#configuration
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
            ]
        },
        // https://ckeditor.com/docs/ckeditor5/latest/features/editor-placeholder.html#using-the-editor-configuration
        placeholder: "'شروع مقاله...'",
        // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-family-feature
        fontFamily: {
            options: [
                'default',
                'Arial, Helvetica, sans-serif',
                'Courier New, Courier, monospace',
                'Georgia, serif',
                'Lucida Sans Unicode, Lucida Grande, sans-serif',
                'Tahoma, Geneva, sans-serif',
                'Times New Roman, Times, serif',
                'Trebuchet MS, Helvetica, sans-serif',
                'Verdana, Geneva, sans-serif'
            ],
            supportAllValues: true
        },
        // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
        fontSize: {
            options: [10, 12, 14, 'default', 18, 20, 22],
            supportAllValues: true
        },
        // Be careful with the setting below. It instructs CKEditor to accept ALL HTML markup.
        // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html#enabling-all-html-features
        htmlSupport: {
            allow: [
                {
                    name: /.*/,
                    attributes: true,
                    classes: true,
                    styles: true
                }
            ]
        },
        // Be careful with enabling previews
        // https://ckeditor.com/docs/ckeditor5/latest/features/html-embed.html#content-previews
        htmlEmbed: {
            showPreviews: true
        },
        // https://ckeditor.com/docs/ckeditor5/latest/features/link.html#custom-link-attributes-decorators
        link: {
            decorators: {
                addTargetToExternalLinks: true,
                defaultProtocol: 'https://',
                toggleDownloadable: {
                    mode: 'manual',
                    label: 'Downloadable',
                    attributes: {
                        download: 'file'
                    }
                }
            }
        },
        // https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#configuration
        mention: {
            feeds: [
                {
                    marker: '@',
                    feed: [
                        '@apple', '@bears', '@brownie', '@cake', '@cake', '@candy', '@canes', '@chocolate', '@cookie', '@cotton', '@cream',
                        '@cupcake', '@danish', '@donut', '@dragée', '@fruitcake', '@gingerbread', '@gummi', '@ice', '@jelly-o',
                        '@liquorice', '@macaroon', '@marzipan', '@oat', '@pie', '@plum', '@pudding', '@sesame', '@snaps', '@soufflé',
                        '@sugar', '@sweet', '@topping', '@wafer'
                    ],
                    minimumCharacters: 1
                }
            ]
        },
        // The "super-build" contains more premium features that require additional configuration, disable them below.
        // Do not turn them on unless you read the documentation and know how to configure them and setup the editor.
        removePlugins: [
            // These two are commercial, but you can try them out without registering to a trial.
            // 'ExportPdf',
            // 'ExportWord',
            'CKBox',
            'CKFinder',
            'EasyImage',
            // This sample uses the Base64UploadAdapter to handle image uploads as it requires no configuration.
            // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/base64-upload-adapter.html
            // Storing images as Base64 is usually a very bad idea.
            // Replace it on production website with other solutions:
            // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html
            // 'Base64UploadAdapter',
            'RealTimeCollaborativeComments',
            'RealTimeCollaborativeTrackChanges',
            'RealTimeCollaborativeRevisionHistory',
            'PresenceList',
            'Comments',
            'TrackChanges',
            'TrackChangesData',
            'RevisionHistory',
            'Pagination',
            'WProofreader',
            // Careful, with the Mathtype plugin CKEditor will not load when loading this sample
            // from a local file system (file://) - load this site via HTTP server if you enable MathType.
            'MathType',
            // The following features are part of the Productivity Pack and require additional license.
            'SlashCommand',
            'Template',
            'DocumentOutline',
            'FormatPainter',
            'TableOfContents'
        ]
    })
        .then((editor) => {
            articleBodyEditor = editor;
        })
        .catch((error) => {
            console.error(error);
        });

}





export { preparingForm, createArticle, draftArticle }