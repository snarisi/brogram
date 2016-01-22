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
            .then(res => res.data);
        },

        fetchAllByUser: function (userId) {
            return $http.get('/api/files/ownedby/' + userId)
                .then(res => res.data);
        },

        fetchById: function (fileId) {
            return $http.get('/api/files/' + fileId)
                .then(res => res.data);
        }
    }
});
