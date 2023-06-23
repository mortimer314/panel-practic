


const performanceContent = document.querySelector(".performance-chart__content")
let ctx = document.querySelector('.performance-chart-curve');
ctx.style.width = "100%"
let ctx1 = document.querySelector('.week-chart-curve1');
ctx1.style.width = "100%"
let ctx2 = document.querySelector('.week-chart-curve2');
ctx2.style.width = "100%"
let ctx3 = document.querySelector('.week-chart-curve3');
ctx3.style.width = "100%"

const performanceArray = document.querySelectorAll('.performance-chart__item')

let performanceData = [
    {
        labels:
            ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
        label: 'کاربران جدید',
        data: [120, 200, 150, 250, 50, 100, 80, 390, 300, 500, 200, 300],
    },
    {
        labels:
            ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
        label: 'فروش',
        data: [5000, 2000, 1500, 2500, 5000, 1000, 7000, 3090, 3000, 5000, 2000, 3000],
    },
    {
        labels:
            ['JS', 'React js', 'Vue js', 'Git', 'Bootstrap', 'Tailwind',],
        label: 'دوره ها',
        data: [120, 200, 150, 250, 50, 100,],
    },
]

let performanceMainData = 0

new Chart(ctx, {
    type: 'line',
    data: {

        labels: performanceData[performanceMainData].labels,
        datasets: [{
            label: 'کاربران جدید',
            data: performanceData[performanceMainData].data,
            borderWidth: 2,
            borderColor: "rgb(255,0,182)",
            backgroundColor: "#ff36c33e",

            fill: true,
            tension: 0.5
        }]
    },
    options: {
        responsive: true, // not necessary, default is `true`,
        maintainAspectRatio: true, // default is `true`, default `aspectRatio` is 2
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#000',
                    drawBorder: false
                }
            },
            x: {
                grid: {
                    display: true,
                    color: '#fff',
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    },

});
new Chart(ctx1, {
    type: 'line',
    data: {

        labels: ["شنبه",'یکشنبه','دوشنبه','سه شنبه','چهاشنبه','پنج شنبه','جمعه'],
        datasets: [{
            label: 'کاربران جدید',
            data: [100,250,50,122,233,156,345],
            borderWidth: 2,
            // borderColor: "rgb(255,0,182)",
            // backgroundColor: "#ff36c33e",

            fill: true,
            tension: 0.5
        }]
    },
    options: {
        responsive: true, // not necessary, default is `true`,
        maintainAspectRatio: true, // default is `true`, default `aspectRatio` is 2
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#000',
                    drawBorder: false
                }
            },
            x: {
                grid: {
                    display: true,
                    color: '#fff',
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    },

});
new Chart(ctx2, {
    type: 'bar',
    data: {

        labels: performanceData[performanceMainData].labels,
        datasets: [{
            label: 'کاربران جدید',
            data: performanceData[performanceMainData].data,
            borderWidth: 2,
            borderColor: "rgb(255,0,182)",
            backgroundColor: "#ff36c33e",

            fill: true,
            tension: 0.5
        }]
    },
    options: {
        responsive: true, // not necessary, default is `true`,
        maintainAspectRatio: true, // default is `true`, default `aspectRatio` is 2
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#000',
                    drawBorder: false
                }
            },
            x: {
                grid: {
                    display: true,
                    color: '#fff',
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    },

});
new Chart(ctx3, {
    type: 'line',
    data: {

        labels: ["شنبه",'یکشنبه','دوشنبه','سه شنبه','چهاشنبه','پنج شنبه','جمعه'],
        datasets: [{
            label: 'کاربران جدید',
            data: [100,250,50,122,233,156,345],
            borderWidth: 2,
            borderColor: "#8cdb5a",
            backgroundColor: "#8bdb5a91",

            fill: true,
            tension: 0.5
        }]
    },
    options: {
        responsive: true, // not necessary, default is `true`,
        maintainAspectRatio: true, // default is `true`, default `aspectRatio` is 2
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#000',
                    drawBorder: false
                }
            },
            x: {
                grid: {
                    display: true,
                    color: '#fff',
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    },

});
performanceArray.forEach((item) => {

    item.addEventListener("click", () => {
        performanceArray.forEach(item => {
            item.classList.remove('performance-chart__item--active')
        })
        item.classList.add('performance-chart__item--active')
        performanceMainData = Number(item.dataset.chart - 1)
        
        performanceContent.innerHTML = `<canvas class="performance-chart-curve"></canvas>`

        ctx = document.querySelector('.performance-chart-curve');
        ctx.style.width = "100%"
      
        console.log(performanceData[performanceMainData].labels)
        console.log(performanceData[performanceMainData].data)
        new Chart(ctx, {
            type: 'line',
            data: {

                labels: [...performanceData[performanceMainData].labels],
                datasets: [{
                    label: performanceMainData.label,
                    data: [...performanceData[performanceMainData].data],
                    borderWidth: 2,
                    borderColor: "rgb(255,0,182)",
                    backgroundColor: "#ff36c33e",

                    fill: true,
                    tension: 0.5
                }]
            },
            options: {
                responsive: true, // not necessary, default is `true`,
                // maintainAspectRatio: false, // default is `true`, default `aspectRatio` is 2
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#000',
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: true,
                            color: '#fff',
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },

        });

    })
})



window.addEventListener("resize", () => {
    console.log('resize')
    location.href = location.href
})