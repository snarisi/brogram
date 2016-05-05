app.factory('User', function ($http) {
    return {
        newUser: function (userInfo) {
            return $http({
                method: 'POST',
                url: '/api/users',
                data: userInfo
            })
            .then(res => res.data);
        }

    }
})
