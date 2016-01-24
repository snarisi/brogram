app.factory('User', function ($http) {
    return {
        newUser: function (userInfo) {
            console.log('factory: ', userInfo)
            return $http({
                method: 'POST',
                url: '/api/users',
                data: userInfo
            })
            .then(res => res.data);
        }

    }
})
