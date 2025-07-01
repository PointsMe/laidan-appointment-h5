export default [
    {
        path: '/',
        name: 'Welcome',
        component: () => import('../views/Welcome.vue'),
        meta: {
            keepAlive: true
        }

    },
    {
        path: '/chooseTime',
        name: 'ChooseTime',
        component: () => import('../views/ChooseTime.vue'),
        meta: {
            keepAlive: true
        },
        redirect: '/chooseTime/stepOne',
        children: [
            {
                path: 'stepOne',
                name: 'StepOne',
                component: () => import('../views/components/StepOne.vue'),
            },
            {
                path: 'stepTwo',
                name: 'StepTwo',
                component: () => import('../views/components/StepTwo.vue'),
            },
            {
                path: 'stepThree',
                name: 'StepThree',
                component: () => import('../views/components/StepThree.vue'),
            },
            {
                path: 'stepFour',
                name: 'StepFour',
                component: () => import('../views/components/StepFour.vue'),
            }
        ]
    },
    {
        path: '/reservationInformation',
        name: 'ReservationInformation',
        component: () => import('../views/ReservationInformation.vue'),
    },
    {
        path: '/sureInformation',
        name: 'SureInformation',
        component: () => import('../views/SureInformation.vue'),
    },
    {
        path: '/evaluation',
        name: 'Evaluation',
        component: () => import('../views/EvaluationView.vue'),
    }
]
