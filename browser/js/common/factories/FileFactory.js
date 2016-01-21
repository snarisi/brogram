app.factory('File', function ($http) {

    return {
        save: function (file) {
            const method = file._id ? 'PUT' : 'POST';
            const id = file._id ? '/' + file._id.toString() : '';
            return $http({
                method: method,
                url: '/api/files' + id,
                data: file
            })
            .then(res => res.data)
        },

    }
});
